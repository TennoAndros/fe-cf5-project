/* eslint-disable react/prop-types */
import { useState } from "react";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";
import { removeBookById } from "../../api/api";
import { Button, Modal, ModalBody } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Error from "../Error";

const DeleteBook = ({ bookId }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const deleteBook = async () => {
    try {
      setIsLoading(true);
      await removeBookById(bookId);
      navigate("/");
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  if (error) {
    console.log("ERROR", error);
    return <Error err={error} />;
  }

  if (isLoading) return <Loading />;

  return (
    <div className="flex">
      <Button onClick={() => setShowModal(true)} color="failure" className="mt-6">
        Delete Book!
      </Button>
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
            <h3 className="mb-5 font-roboto text-lg text-gray-500 dark:text-gray-500 ">
              Are you sure you want to delete this book?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteBook}>
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

export default DeleteBook;
