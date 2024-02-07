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

const Anns = ({ dataReader, articles }) =>
  dataReader.isLoading ? (
    <AnnouncementLoader />
  ) : (
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
      {[...articles, ...dataReader.data]
        .sort((a, b) => new Date(b.Pubdate) - new Date(a.Pubdate))
        .map((d) => {
          return (
            <SwiperSlide>
              <Announcement key={d.Id} {...d} />
            </SwiperSlide>
          );
        })}
    </Swiper>
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
  const {
    allNodeArticle: { edges },
  } = data;
  const annsReader = useData("https://www.dvrpc.org/api/announcements?limit=3");
  const eventsReader = useData(
    "https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?maxresults=4"
  );
  const productsReader = useData("https://www.dvrpc.org/api/products?limit=6");
  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  const articles = Array.from(edges, ({ node }) => {
    return { ...node, Link: node.path.alias };
  });

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
          className=" rounded-bl-lg md:w-2/5"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.9) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <div className="relative mx-auto py-4 pl-8">
            <h3 className="text-3xl font-bold text-[#296591]">News</h3>
            <Anns dataReader={annsReader} articles={articles} />
            <div className="absolute right-10 z-[999] hidden items-center md:bottom-[1.35rem] md:block">
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
          <div className="container px-8">
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
  query {
    blockContentAlertBanner {
      body {
        processed
      }
    }
    allNodeArticle(
      filter: { promote: { eq: true } }
      limit: 3
      sort: { created: DESC }
    ) {
      edges {
        node {
          Id: id
          Title: title
          Pubdate: created
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
    }
  }
`;
