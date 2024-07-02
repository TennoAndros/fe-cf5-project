/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import DeleteReview from "./DeleteReview";
import EditReviewIcon from "./EditReviewIcon";

const ReviewCard = ({
  review,
  currentUser,
  setReviews,
  setTotalCount,
  setShowEditReview,
  setReviewInEdit,
}) => {
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showEditButton, setShowEditButton] = useState(false);

  const dateString = review.created_at;
  const dateTime = new Date(dateString);
  const formattedDate = dateTime.toLocaleDateString("en-GB");

  useEffect(() => {
    if (
      currentUser &&
      currentUser.username &&
      review.username === currentUser.username
    ) {
      setShowDeleteButton(true);
      setShowEditButton(true);
    }
  }, [currentUser, review.username]);

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} className="text-[#f48c06] text-lg" />);
    }
    if (hasHalfStar) {
      stars.push(
        <BsStarHalf key={stars.length} className="text-[#f48c06] text-lg" />
      );
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <BsStar key={stars.length + i} className="text-[#f48c06] text-lg" />
      );
    }
    return stars;
  };

  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-auto overflow-hidden rounded-lg p-4 shadow-2xl transition-all">
      <div className="flex justify-end">
        {showDeleteButton && currentUser && (
          <DeleteReview
            reviewId={review.review_id}
            setReviews={setReviews}
            setTotalCount={setTotalCount}
          />
        )}
        {showEditButton && currentUser && (
          <EditReviewIcon
            setShowEditReview={setShowEditReview}
            setReviewInEdit={setReviewInEdit}
            review={review}
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold">{formattedDate}</p>
        <p className="break-words whitespace-normal">{review.body}</p>
        <div className="flex items-center">
          <span className="text-lg mr-2">Rating:</span>
          <div className="flex items-center">
            {renderRatingStars(review.rating)}
            <span className="text-[#f48c06] text-lg ml-2">
              {review.rating.toFixed(1)}/5
            </span>
          </div>
        </div>
        <p className="mt-2">@{review.username}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
