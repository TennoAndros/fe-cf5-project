import { Button } from "flowbite-react";
import books from "../assets/books.png";
import { Link } from "react-router-dom";

const Explore = () => {
  return (
    <div className="px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="md:w-auto space-y-6">
        <img src={books} alt="book image" className="rounded md:w-10/12" />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-5xl font-bold my-5 md:w-3/4 leading-snug">
          Find our list of <span className="text-gradient">Books</span>
        </h2>
        <div className="flex flex-col  my-14">
          <p className="mb-10 text-lg md:w-5/6">
            Dive now in our wide variety of books to discover your next great
            read. Whether you&apos;re looking to immerse yourself in a new story
            or eager to review and rate another, our collection has something
            for everyone. Dive in and find your new favorite book today!
          </p>
          <div className="flex mt-8">
            <Link to="/books">
              <Button
                gradientDuoTone="purpleToBlue"
                className="font-bold px-10"
                size="lg"
                pill
              >
                Explore More
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
