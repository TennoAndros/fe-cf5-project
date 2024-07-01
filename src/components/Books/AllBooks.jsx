import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, fetchGenres } from "../../api/api";
import Error from "../Error";
import BookCard from "./BookCard";
import Loading from "../Loading";
import "../../index.css";
import { Button, Dropdown } from "flowbite-react";

const AllBooks = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [books, setBooks] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [queryGenre, setQueryGenre] = useState("");
  const [limit, setLimit] = useState(18);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [booksData, genresData] = await Promise.all([
          fetchBooks({ sortBy, order, genre: queryGenre, limit }),
          fetchGenres(),
        ]);
        setBooks(booksData.books);
        setTotalCount(booksData.total_count);
        setAllGenres(genresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [sortBy, order, queryGenre, limit]);

  if (error) return <Error err={error} />;

  if (isLoading) return <Loading />;

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleOrderChange = (value) => {
    setOrder(value);
  };

  const handleGenreChange = (value) => {
    setQueryGenre(value);
  };

  const loadMoreBooks = () => {
    setLimit((curLimit) => curLimit + 6);
  };

  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">
        All <span className="text-gradient">Books</span>
      </h1>
      <div className="text-base mb-4 ml-1">
        Total Books: {totalCount}
      </div>
      <div className="flex flex-col md:flex-row mb-6">
        <div className="w-full md:w-auto mb-4 ml-1 md:mb-0 md:mr-4">
          <Dropdown
            label="Sort By"
            dismissOnClick={false}
            color="blue"
            theme={{ floating: { target: "w-full" } }}
          >
            <Dropdown.Item onClick={() => handleSortChange("title")}>
              Title
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("genre")}>
              Genre
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("author")}>
              Author
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("avg_rating")}>
              Rating
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortChange("review_count")}>
              Reviews
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-full md:w-auto mb-4 ml-1 md:mb-0 md:mr-4">
          <Dropdown
            label="Order By"
            dismissOnClick={false}
            color="blue"
            theme={{ floating: { target: "w-full" } }}
          >
            <Dropdown.Item onClick={() => handleOrderChange("asc")}>
              Ascending
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOrderChange("desc")}>
              Descending
            </Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-full md:w-auto mb-4 ml-1 md:mb-0 md:mr-4">
          <Dropdown
            label="Choose Genre"
            dismissOnClick={false}
            color="blue"
            className="overflow-auto h-48"
            theme={{ floating: { target: "w-full" } }}
          >
            <Dropdown.Item onClick={() => handleGenreChange("")}>
              All
            </Dropdown.Item>
            {allGenres.map((genre, index) => (
              <Dropdown.Item
                key={index}
                onClick={() => handleGenreChange(genre.genre)}
              >
                {genre.genre}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        {currentUser && (
          <div className="w-full md:w-auto flex items-center justify-start ml-1 md:ml-auto md:justify-end mt-4 md:mt-0 lg:mr-7">
            <Link to="/post-book">
              <Button
                size="md"
                gradientDuoTone="purpleToBlue"
                className="justify-end"
              >
                Post New Book
              </Button>
            </Link>
          </div>
        )}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {books.map((book) => {
          return <BookCard key={book.book_id} book={book} />;
        })}
      </div>
      <div className="flex justify-center mt-10">
        <Button
          size="lg"
          gradientDuoTone="pinkToOrange"
          className="mt-4 disabled:cursor-not-allowed"
          disabled={totalCount === books.length}
          onClick={loadMoreBooks}
        >
          View More
        </Button>
      </div>
    </section>
  );
};

export default AllBooks;
