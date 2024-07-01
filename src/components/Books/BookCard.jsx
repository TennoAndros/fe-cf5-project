/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";


const BookCard = ({book}) => {
  return (
    <div className="flex flex-col items-center sm:flex-row rounded-lg shadow-2xl w-full">
      <div className="flex items-center justify-center w-full sm:w-1/3">
        <Link to={`/books/${book.book_id}`}>
          <img
            src={book.image_url}
            alt="Book Cover"
            className="w-full h-auto rounded-lg cursor-pointer"
          />
        </Link>
      </div>
      <div className="info flex flex-col justify-center py-8 px-6 sm:px-2 w-full sm:w-2/3">
        <div className="category mb-2">
          <span >{book.genre}</span>
        </div>
        <Link
          to={`/books/${book.book_id}`}
          className="title text-xl font-bold truncate-text cursor-pointer"
        >
          {book.title}
        </Link>
        <p className="description text-base py-6 overflow-hidden">
          <span className="block h-24 overflow-y-auto">
            {book.description}
          </span>
        </p>
        <p className="author text-base truncate-text">
          {book.author}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
