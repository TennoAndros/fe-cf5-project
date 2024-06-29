import {
  Alert,
  Button,
  Modal,
  ModalBody,
  TextInput,
  Spinner,
} from "flowbite-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { app } from "../services/firebase";
import { updateUser, removeUserByUsername, logoutUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { isFileSizeValid } from "../utils/validators";

const Profile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  console.log(currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const uploadImage = useCallback(async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    if (!isFileSizeValid(imageFile)) {
      setImageFileUploadError("File size must be less than 3MB");
      setImageFileUploading(false);
      return;
    }

    const storage = getStorage(app);
    const fileName = imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("Error uploading image: " + error.message);
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(currentUser.avatar_url);
        setImageFileUploading(false);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageFileUrl(downloadURL);
          setFormData((prevFormData) => ({
            ...prevFormData,
            avatar_url: downloadURL,
          }));
        } catch (error) {
          setImageFileUploadError("Failed to get download URL");
        } finally {
          setImageFileUploading(false);
          setImageFileUploadProgress(null);
        }
      }
    );
  }, [imageFile, currentUser.avatar_url]);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile, uploadImage]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0 && !imageFileUrl) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait for the image to upload");
      return;
    }
    try {
      await dispatch(
        updateUser({ username: currentUser.username, updatedUser: formData })
      ).unwrap();
      setUpdateUserSuccess("User's profile updated successfully");

      dispatch({ type: "user/updateCurrentUser", payload: formData });
    } catch (error) {
      console.error("Error updating user:", error.message);
      setUpdateUserError("Failed to update user");
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      await dispatch(removeUserByUsername(currentUser.username)).unwrap();
      navigate("/");
    } catch (err) {
      setUpdateUserError("Failed to delete user:", err);
    }
  };

  const handleSignout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to Sign Out:", err);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-36 h-36 self-center cursor-pointer shadow-2xl overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress !== null && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(23, 121, 249, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.avatar_url}
            alt="user image"
            className={`rounded-full w-full h-full object-cover border-8 border-orange-200 ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-60"
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="first_name"
          placeholder="First Name"
          defaultValue={currentUser.first_name}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="last_name"
          placeholder="Last Name"
          defaultValue={currentUser.last_name}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageFileUploading}
        >
          {loading || imageFileUploading ? (
            <>
              <Spinner color="info" size="sm" />
              <span className="pl-4">Loading...</span>
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
      <div className=" flex justify-between mt-5">
        <span
          onClick={() => setShowModal(true)}
          className="cursor-pointer text-red-500"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignout}
          className="cursor-pointer text-orange-400"
        >
          Sign Out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
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
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default Profile;
