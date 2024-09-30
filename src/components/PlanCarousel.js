import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Zoom from "react-medium-image-zoom";
import Cover from "../images/1-cover.png";
import Transportation from "../images/2-transportation.png";
import Energy from "../images/3-energy.png";
import Environment from "../images/4-environment.png";
import Communities from "../images/5-communities.png";
import Economy from "../images/6-Economy.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-medium-image-zoom/dist/styles.css";

const PlanCarousel = () => {
  return (
    <Swiper
      navigation
      pagination
      modules={[Navigation, Pagination]}
      className="mySwiper"
      style={{
        "--swiper-navigation-color": "#939598",
        "--swiper-pagination-color": "#939598",
      }}
    >
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Cover} alt="DVRPC Long Range Plan cover page" />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img
            src={Transportation}
            alt="DVRPC Long Range Plan transportation page"
          />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Energy} alt="DVRPC Long Range Plan energy page" />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Environment} alt="DVRPC Long Range Plan environment page" />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Communities} alt="DVRPC Long Range Plan communities page" />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Economy} alt="DVRPC Long Range Plan economy page" />
        </Zoom>
      </SwiperSlide>
    </Swiper>
  );
};

export default PlanCarousel;
