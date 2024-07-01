import { useEffect, useState } from "react";
import Loading from "../Loading";
import { fetchBooks } from "../../api/api";
import PopularBooksCard from "./PopularBooksCard";
import Error from "../Error";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const booksData = await fetchBooks({
        sortBy: "avg_rating",
        order: "desc",
        genre: "",
        limit: 7,
        p: 1,
      });
      setBooks(booksData.books);
      setIsLoading(false);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    console.log("ERROR", error);
    return <Error err={error} />;
  }

  if (isLoading) return <Loading />;

  return (
    <div>
      <PopularBooksCard books={books} headline="Popular Books" />
    </div>
  );
};

export default PopularBooks;
