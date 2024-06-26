import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../api/api";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(loginUser(formData)).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex p-8 md:p-16 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center w-full">
          <Link
            to="/"
            className="font-bold dark:text-orange-400 text-4xl mb-10"
          >
            <span className="text-sky-500">Sign In</span>
          </Link>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <div className="w-full">
              <Label value="Insert Your Username" />
              <TextInput
                className="h-12 w-full text-lg"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <Label value="Insert Your Password" />
              <TextInput
                className="h-12 w-full text-lg"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className="h-10 w-full text-lg"
              gradientDuoTone="purpleToBlue"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner color="info" size="sm" />
                  <span className="pl-4">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t have an account?</span>
            <Link to="/sign-up" className="text-orange-400">
              Sign Up
            </Link>
          </div>
          {error && (
            <Alert className="mt-5 w-full" color="failure">
              {error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
