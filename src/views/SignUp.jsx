import { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../api/api";
import { isEmailValid, isPasswordStrong } from "../utils/validators";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar_url: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value.trim() });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    const { email, password } = formData;

    if (!isEmailValid(email)) {
      setLoading(false);
      return setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
    }

    if (!isPasswordStrong(password)) {
      setLoading(false);
      return setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    }

    try {
      await createUser(formData);
      setLoading(false);
      setSuccessMessage("Account created!");
    } catch (err) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: err.message,
      }));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex p-16 max-w-3xl mx-auto md:flex-row md:items-center gap-5 rounded shadow-2xl">
        {successMessage && (
          <div className="flex-1 items-center p-6">
            <h1 className="text-2xl text-[#0096c7] mb-4 text-center">
              {successMessage}
            </h1>
            <Link to="/sign-in" className="text-[#f48c06] text-center">
              <p className="text-2xl font-light">
                <b>
                  <u>Sign in</u>
                </b>
              </p>
            </Link>
          </div>
        )}
        {!successMessage && (
          <>
            <div className="flex-1">
              <Link to="/" className="font-bold dark:text-white text-4xl">
                <span className="px-4 py-1 bg-gradient-to-r from-orange-400 via-purple-600 to-sky-500 rounded-full text-white font-playfair">
                  Book Talk
                </span>
              </Link>
              <p className="text-sm mt-5">
                Sign up now and join our community of book lovers to share your
                reviews and discover new reads.
              </p>
            </div>
            <div className="flex-1">
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                  <Label value="Create Your Username" />
                  <TextInput
                    type="text"
                    placeholder="Username"
                    id="username"
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs">{errors.username}</p>
                  )}
                </div>
                <div>
                  <Label value="Create Your Password" />
                  <TextInput
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password}</p>
                  )}
                </div>
                <div>
                  <Label value="Enter Your Email" />
                  <TextInput
                    type="email"
                    placeholder="e-mail"
                    id="email"
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label value="Enter Your First Name" />
                  <TextInput
                    type="text"
                    placeholder="First name"
                    id="first_name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Enter Your Last Name" />
                  <TextInput
                    type="text"
                    placeholder="Last name"
                    id="last_name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label value="Choose an avatar url" />
                  <TextInput
                    type="text"
                    placeholder="Avatar url"
                    id="avatar_url"
                    onChange={handleChange}
                  />
                </div>
                <Button
                  gradientDuoTone="purpleToBlue"
                  type="submit"
                  disabled={loading}
                  pill
                  className="mt-2"
                >
                  {loading ? (
                    <>
                      <Spinner color="info" size="sm" />
                      <span className="pl-4">Loading...</span>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
              <div className="flex gap-2 text-sm mt-5">
                <span>Already have an account?</span>
                <Link to="/sign-in" className="text-orange-400">
                  Sign In
                </Link>
              </div>
              {errors.general && (
                <Alert className="mt-5" color="failure">
                  {errors.general}
                </Alert>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
