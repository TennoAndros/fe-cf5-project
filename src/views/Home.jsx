import Banner from "../components/Banner";
import PopularBooks from "../components/Books/PopularBooks";
import Explore from "../components/Explore";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularBooks />
      <Explore />
    </div>
  );
};

export default Home;
