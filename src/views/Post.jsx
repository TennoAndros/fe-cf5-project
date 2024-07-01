import { Button, Select, Spinner, TextInput, Alert } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createBook, fetchGenres } from "../api/api";
import Error from "../components/Error";
import "../App.css";

const CreatePost = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [allGenres, setAllGenres] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const genresData = await fetchGenres();
        setAllGenres(genresData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await createBook(formData);
      setLoading(false);
      setSuccessMessage("Book posted!");
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  if (error) return <Error err={error} />;

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Post a book</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              onChange={(event) =>
                setFormData({ ...formData, title: event.target.value })
              }
            />
            <TextInput
              type="text"
              placeholder="Image url"
              required
              id="image"
              onChange={(event) =>
                setFormData({ ...formData, image_url: event.target.value })
              }
            />
            <TextInput
              type="text"
              placeholder="Publisher"
              required
              id="publisher"
              onChange={(event) =>
                setFormData({ ...formData, publisher: event.target.value })
              }
            />
            <Select
              required
              onChange={(event) =>
                setFormData({ ...formData, genre: event.target.value })
              }
            >
              {allGenres.map((genre, index) => (
                <option key={index} value={genre.genre}>
                  {genre.genre}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Author"
              required
              id="author"
              onChange={(event) =>
                setFormData({ ...formData, author: event.target.value })
              }
            />
            <TextInput
              type="text"
              placeholder="Amazon url"
              required
              id="amazon"
              onChange={(event) =>
                setFormData({
                  ...formData,
                  amazon_book_url: event.target.value,
                })
              }
            />
            <TextInput
              type="number"
              placeholder="ISBN"
              required
              id="isbn"
              onChange={(event) =>
                setFormData({ ...formData, isbn: event.target.value })
              }
            />
          </div>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Book Description..."
          className="h-72 mb-12 ql-snow"
          required
          onChange={(value) => {
            setFormData({ ...formData, description: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue">
          {loading ? (
            <>
              <Spinner color="info" size="sm" />
              <span className="pl-4">Posting...</span>
            </>
          ) : (
            "Post Book"
          )}
        </Button>
        {successMessage && (
          <div>
            <Alert color="success" onDismiss={() => alert("Alert dismissed!")}>
              <span className="font-medium"> {successMessage}</span>
            </Alert>
            <Link to="/" className="flex flex-row items-center">
              <Button size="lg" gradientDuoTone="pinkToOrange" className="mt-4">
                Home
              </Button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
