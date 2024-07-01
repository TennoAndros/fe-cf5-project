import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookById } from "../../api/api";
import Error from "../Error";
import Loading from "../Loading";
import DeleteBook from "./DeleteBook";
import { useSelector } from "react-redux";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import ReviewList from "../Reviews/ReviewList";

const BookItem = () => {
  const { currentUser } = useSelector((state) => state.user);

  const { book_id } = useParams();
  const [book, setBook] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setReviewSubmitted(false);
        setIsLoading(true);
        const bookData = await fetchBookById(book_id);
        setBook(bookData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [book_id, reviewSubmitted]);

  const renderRatingStars = () => {
    if (book.avg_rating === undefined || book.avg_rating === null) return null;

    const fullStars = Math.floor(book.avg_rating);
    const halfStar = book.avg_rating - fullStars >= 0.5;

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={i} className="text-[#f48c06] text-lg" />);
    }
    if (halfStar) {
      stars.push(
        <BsStarHalf key={stars.length} className="text-[#f48c06] text-lg" />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <BsStar key={stars.length + i} className="text-[#f48c06] text-lg" />
      );
    }

    if (book.avg_rating === 0.0) {
      stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(<BsStar key={i} className="text-[#f48c06] text-lg" />);
      }
    }

    return stars;
  };

  if (error) {
    console.error("ERROR", error);
    return <Error err={error} />;
  }

  if (isLoading || !book.title) return <Loading />;

  return (
    <>
      <section className="container mx-auto md:px-2 py-16 flex flex-col md:flex-row items-center">
        <div className="flex-none md:mr-10 mb-6 md:mb-0">
          <img
            src={book.image_url}
            alt="Book Image"
            className="rounded-lg shadow-xl"
            style={{ width: 400, height: 600 }}
          />
        </div>
        <div className="flex flex-col justify-center text-center md:text-left md:ml-8">
          <h1 className="font-bold text-4xl pb-5">{book.title}</h1>
          <p className="text-lg ">Description: {book.description}</p>
          <p className="text-lg">Author: {book.author}</p>
          <p className="text-lg">Genre: {book.genre}</p>
          <p className="text-lg">
            Amazon url:{" "}
            <a href={book.amazon_book_url}>
              <u>{book.amazon_book_url} </u>{" "}
            </a>
          </p>
          <p className="text-lg ">Publisher: {book.publisher}</p>
          <p className="text-lg ">ISBN: {book.isbn}</p>
          <div className="flex items-center justify-center md:justify-start mt-4">
            <span className="text-lg mr-2">Rating:</span>
            <div className="flex items-center">
              {renderRatingStars()}
              <span className="text-[#f48c06] text-lg ml-2">
                {book.avg_rating.toFixed(1)}/5
              </span>
            </div>
          </div>
          {currentUser && currentUser.username === "Admin" && (
            <DeleteBook bookId={book_id} />
          )}
        </div>
      </section>
      <ReviewList
        currentUser={currentUser}
        bookId={book_id}
        setReviewSubmitted={setReviewSubmitted}
      />
    </>
  );
};

export default BookItem;
