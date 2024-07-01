/* eslint-disable react/prop-types */
import { useState } from "react";
import { updateReviewById } from "../../api/api";
import Error from "../Error";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { BsStarFill } from "react-icons/bs";

const EditReview = ({
  currentUser,
  setReviewSubmitted,
  reviewInEdit,
  setShowEditReview,
}) => {
  const [postNewReview, setPostNewReview] = useState({
    body: reviewInEdit.body,
    rating: reviewInEdit.rating,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (rating) => {
    setPostNewReview({
      ...postNewReview,
      rating: rating,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("UPDATE", {
        reviewId: reviewInEdit.review_id,
        postNewReview,
      });
      setLoading(true);
      await updateReviewById({
        reviewId: reviewInEdit.review_id,
        reviewObj: postNewReview,
      });
      setSuccessMessage("Review Edited");
      setLoading(false);
      setReviewSubmitted(true);
      setShowEditReview(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (error) return <Error err={error} />;

  const renderRatingStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <BsStarFill
          key={i}
          className={`text-[#f48c06] text-lg cursor-pointer ${
            i <= postNewReview.rating ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => handleRatingChange(i)}
        />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col mt-6 rounded shadow-2xl p-6 mx-auto lg:w-1/3">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
        <div className="w-full lg:w-1/3">
          <TextInput
            disabled
            type="text"
            placeholder="Username"
            addon="@"
            value={currentUser.username}
            aria-label="Review Author"
          />
        </div>
        <div className="flex items-center mt-4 lg:mt-0">
          <span className="text-lg mr-2">Rating:</span>
          <div className="flex items-center">{renderRatingStars()}</div>
        </div>
      </div>
      <Textarea
        className="mt-4"
        placeholder="Edit Review..."
        rows="4"
        maxLength="500"
        onChange={(event) =>
          setPostNewReview({ ...postNewReview, body: event.target.value })
        }
        value={postNewReview.body}
      />
      <div className="flex justify-between items-center mt-5">
        <p className="text-gray-500 text-base">
          {500 - postNewReview.body.length} chars remaining
        </p>
        <Button
          gradientDuoTone="purpleToBlue"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Spinner color="info" size="sm" />
              <span className="pl-4">Loading...</span>
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
        {successMessage && (
          <p className="text-green-500 font-bold">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EditReview;
