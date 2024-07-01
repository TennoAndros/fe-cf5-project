/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { fetchReviewsByBookId } from "../../api/api";
import Error from "../Error";
import ReviewCard from "./ReviewCard";
import SubmitReview from "./SubmitReview";
import { Link } from "react-router-dom";
import EditReview from "./EditReview";

const ReviewList = ({ currentUser, bookId, setReviewSubmitted }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(6);
  const [totalCount, setTotalCount] = useState(0);
  const [showSubmitReview, setShowSubmitReview] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [reviewInEdit, setReviewInEdit] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  currentUser && buttonDisabled && setButtonDisabled(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await fetchReviewsByBookId({ bookId, limit });
        setReviews(data.reviews);
        setTotalCount(data.total_count);
      } catch (err) {
        setError(err);
      }
    };
    fetchReviews();
  }, [bookId, limit]);

  if (error) return <Error err={error} />;

  const loadMoreReviews = () => {
    setLimit((curLimit) => curLimit + 6);
  };

  const handleAddReviewClick = () => {
    if (!currentUser) {
      setShowSubmitReview(false);
      setOpenModal(true);
    } else {
      setShowSubmitReview(true);
      setButtonDisabled(false);
      setOpenModal(false);
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto md:px-4 py-2 mt-10">
      <h1 className="font-bold text-4xl py-6 text-center">Reviews</h1>
      <div className="flex flex-col justify-between items-center mb-4 md:flex-row">
        <div className="text-base">Total Reviews: {totalCount}</div>
        <div className="flex flex-row items-end justify-end w-full md:w-auto md:ml-auto">
          <Button onClick={handleAddReviewClick} gradientDuoTone="purpleToBlue">
            Post Review
          </Button>
        </div>
        <div>
          <Modal show={openModal} size="sm" onClose={() => setOpenModal(false)}>
            <Modal.Header />
            <Modal.Body>
              <div className="flex flex-col space-y-6">
                <h3 className="text-xl font-medium text-center text-gray-900 dark:text-white">
                  Sign in to our platform To Post a Review
                </h3>
                <Link to="/sign-in">
                  <div className="w-full flex items-center justify-center">
                    <Button gradientDuoTone="purpleToBlue">Sign In</Button>
                  </div>
                </Link>
                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?&nbsp;
                  <Link
                    to="/sign-up"
                    className="text-cyan-700 hover:underline dark:text-cyan-500"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.review_id}
            review={review}
            currentUser={currentUser}
            setReviews={setReviews}
            setTotalCount={setTotalCount}
            setShowEditReview={setShowEditReview}
            setReviewInEdit={setReviewInEdit}
          />
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={loadMoreReviews}
          disabled={totalCount === reviews.length}
          gradientDuoTone="pinkToOrange"
        >
          View More
        </Button>
      </div>
      {showSubmitReview && currentUser && (
        <div className="mt-10">
          <SubmitReview
            currentUser={currentUser}
            bookId={bookId}
            setReviews={setReviews}
            setShowSubmitReview={setShowSubmitReview}
            setTotalCount={setTotalCount}
            setReviewSubmitted={setReviewSubmitted}
          />
        </div>
      )}
      {showEditReview && currentUser && (
        <div className="mt-10">
          <EditReview
            currentUser={currentUser}
            setReviews={setReviews}
            setShowEditReview={setShowEditReview}
            setReviewInEdit={setReviewInEdit}
            setReviewSubmitted={setReviewSubmitted}
            reviewInEdit={reviewInEdit}
          />
        </div>
      )}
    </section>
  );
};
export default ReviewList;
