/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./PopularBooksStyles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const PopularBooksCard = ({ headline, books }) => {
  return (
    <div className="my-16 px-4 lg:px-24 ">
      <h2 className="text-5xl text-center font-bold mr-5 mb-14">
        {" "}
        {headline}{" "}
      </h2>
      <div>
        <Swiper
          spaceBetween={10}
          centeredSlides={true}
          slidesPerView={1}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          fadeEffect={{
            crossFade: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper "
        >
          {books.map((book) => (
            <SwiperSlide
              key={book.book_id}
              className="rounded-lg overflow-hidden"
            >
              <Link to={`/books/${book.book_id}`}>
                <div>
                  <img src={book.image_url} alt="book image" />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};


export default PopularBooksCard;
