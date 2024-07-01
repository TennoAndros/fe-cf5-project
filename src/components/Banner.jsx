import BannerCard from "./BannerCard";

const Banner = () => {
  return (
    <div className="flex items-center px-4 lg:px-24 bg-gradient-to-r from-orange-400 via-purple-600 to-sky-500">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        <div>
          <h2 className="text-5xl font-bold leading-snug text-white">
            Discover Your New Readings Now
          </h2>
          <p className="md:w-4/5 text-lg mt-4 text-white">
            Welcome to BookTalk, your go-to site for discovering new books and
            insightful reviews. Whether you&apos;re a passionate reader or
            simply curious, BookTalk offers a curated collection across genres.
            Explore detailed reviews, engage with a community of book
            enthusiasts, and find your next literary adventure. Dive into
            stories that inspire and captivate, all in one place at BookTalk.
          </p>
        </div>
        <div>
          <BannerCard />
        </div>
      </div>
    </div>
  );
};

export default Banner;
