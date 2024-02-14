import React, { useRef } from "react";
import { graphql, Link } from "gatsby";
import useData from "../components/common/useData";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement, { AnnouncementLoader } from "../components/Announcement";
import Event, { EventLoader } from "../components/Event";
import Product, { ProductLoader } from "../components/Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../styles/Body.css";

export const Head = () => (
  <>
    <title>Delaware Valley Regional Planning Commission</title>
    <meta
      name="description"
      content="The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for nine counties: Bucks, Chester, Delaware, Montgomery, and Philadelphia, Pennsylvania; and Burlington, Camden, Gloucester, and Mercer, New Jersey."
    />
  </>
);

const Events = ({ dataReader }) =>
  dataReader.isLoading
    ? [...Array(4)].map((_, i) => <EventLoader key={i} />)
    : dataReader.data.map((d) => (
        <Event key={d.StartDate + d.StartTime} {...d} />
      ));

const Products = ({ dataReader }) =>
  dataReader.isLoading
    ? [...Array(6)].map((_, i) => <ProductLoader key={i} />)
    : dataReader.data.map((d) => <Product type="card" key={d.Id} {...d} />);

const HomePage = ({ data }) => {
  const { allNodeArticle, allNodeAnnouncement } = data;
  const eventsReader = useData(
    "https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?maxresults=4"
  );
  const productsReader = useData("https://www.dvrpc.org/api/products?limit=6");
  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  const anns = [...allNodeArticle.nodes, ...allNodeAnnouncement.nodes].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  return (
    <>
      <Header
        bgStyles={{ backgroundSize: "cover" }}
        alert={
          alert.length ? (
            <div className="bg-black/50 text-center text-white">
              <div
                className="container mx-auto py-6 px-8 text-left"
                dangerouslySetInnerHTML={{ __html: alert }}
              />
            </div>
          ) : (
            ""
          )
        }
      >
        <div
          className="rounded-bl-xl md:w-2/5"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 75%, rgba(255,255,255,0) 100%)",
          }}
        >
          <div className="relative mx-auto py-4 pl-8">
            <h3 className="mb-1 text-[33px] font-bold text-[#296591]">News</h3>
            <Swiper
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, Navigation, Pagination]}
              className="homeSwiper"
              style={{
                "--swiper-pagination-color": "#05688D",
              }}
            >
              {anns.map((d) => {
                return (
                  <SwiperSlide>
                    <Announcement key={d.id} {...d} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="absolute right-0 bottom-[1.35rem] z-[999] items-center md:right-10 md:block">
              <Link
                className="flex font-bold text-[#05688D] no-underline hover:underline"
                to="/news"
              >
                View all news
                <span className="my-auto mx-2 h-5 w-5 rounded-full bg-[#05688D] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full scale-50 fill-current"
                  >
                    <path d="m5 3 3-3 12 12L8 24l-3-3 9-9z" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </Header>
      <main>
        <div className="flex justify-center bg-[#bbe2f2]">
          <div className="container px-8 md:pb-8">
            <h3 className="text-3xl">
              <a
                className="text-[#296591]"
                href="https://www.dvrpc.org/Calendar/"
              >
                Events
              </a>
            </h3>
            <div className="flex-auto items-center justify-between md:flex">
              <Events dataReader={eventsReader} />
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-[#e4f5f7]">
          <div className="container px-8">
            <h3 className="text-3xl">
              <a
                className="text-[#296591]"
                href="https://www.dvrpc.org/Products/"
              >
                Products
              </a>
            </h3>
            <div className="grid-cols-3 pb-8 md:grid">
              <Products dataReader={productsReader} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

export const query = graphql`
  {
    blockContentAlertBanner {
      body {
        processed
      }
    }
    allNodeArticle(filter: { promote: { eq: true } }) {
      nodes {
        id
        title
        created
        path {
          alias
        }
        relationships {
          field_image {
            url
          }
        }
      }
    }
    allNodeAnnouncement(filter: { promote: { eq: true } }) {
      nodes {
        id
        title
        created
        body {
          processed
        }
        path: field_url {
          alias: uri
        }
      }
    }
  }
`;
