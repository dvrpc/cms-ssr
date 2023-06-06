import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Zoom from "react-medium-image-zoom";
import Community from "../images/plan-community.png";
import Economy from "../images/plan-economy.png";
import Environment from "../images/plan-environment.png";
import Infrastructure from "../images/plan-infrastructure.png";
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
          <img src={Community} />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Economy} />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Environment} />
        </Zoom>
      </SwiperSlide>
      <SwiperSlide className="p-12 pt-0">
        <Zoom>
          <img src={Infrastructure} />
        </Zoom>
      </SwiperSlide>
    </Swiper>
  );
};

export default PlanCarousel;
