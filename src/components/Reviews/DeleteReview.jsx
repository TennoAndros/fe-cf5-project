/* eslint-disable react/prop-types */
import { useState } from "react";
import { removeReviewById } from "../../api/api";
import Loading from "../Loading";
import Error from "../Error";
import { MdDeleteForever } from "react-icons/md";
import { Button, Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DeleteReview = ({ reviewId, setReviews, setTotalCount }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteReview = async () => {
    try {
      setShowModal(false);
      setIsLoading(true);
      await removeReviewById(reviewId);
      setReviews((currReviews) => {
        return currReviews.filter((review) => {
          return review.review_id !== reviewId;
        });
      });
      setTotalCount((currCount) => --currCount);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  if (error) return <Error err={error} />;

  if (isLoading) return <Loading />;

  return (
    <div className="flex justify-start items-start">
      <button onClick={() => setShowModal(true)} aria-label="Delete Review">
        <MdDeleteForever size={25} className="text-red-600" />
      </button>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 font-roboto text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your review?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteReview}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DeleteReview;
