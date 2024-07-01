/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody } from "flowbite-react";
import { extractErrorMessage } from "../api/api";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const Error = ({ err }) => {
  const errorMessage = extractErrorMessage(err);
  const [showModal, setShowModal] = useState(true);

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
      <Modal.Header />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-red-500 mb-4 mx-auto" />
          <h3 className="mb-5 font-roboto text-lg text-red-500">
            An error has occurred. Please go back and try again!
          </h3>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

          <div className="flex justify-center gap-4">
            <Link to="/" className="mt-6 flex justify-center">
              <Button color="failure">Home</Button>
            </Link>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};


export default Error;
