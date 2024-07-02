/* eslint-disable react/prop-types */
import { MdEdit } from "react-icons/md";

const EditReviewIcon = ({ setShowEditReview, setReviewInEdit, review }) => {
  return (
    <div className="flex justify-start items-start">
      <button
        onClick={() => {
          setShowEditReview(true);
          setReviewInEdit(review);
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        }}
        aria-label="Edit Review"
      >
        <MdEdit size={25} className="text-blue-600" />
      </button>
    </div>
  );
};

export default EditReviewIcon;
