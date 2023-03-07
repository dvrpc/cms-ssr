import React, { Suspense } from "react";
import { graphql } from "gatsby";
import useSWR from "swr";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement, { AnnouncementLoader } from "../components/Announcement";
import Event, { EventLoader } from "../components/Event";
import Product, { ProductLoader } from "../components/Product";
import CSSSlider from "../components/CSSSlider";

import "../styles/Body.css";

const useData = () =>
  useSWR("https://www.dvrpc.org/asp/homepage/default2.aspx", (...args) =>
    fetch(...args).then((res) => res.json())
  );

export const Head = () => {
  return (
    <>
      <title>Delaware Valley Regional Planning Commission</title>
      <meta
        name="description"
        content="The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for nine counties: Bucks, Chester, Delaware, Montgomery, and Philadelphia, Pennsylvania; and Burlington, Camden, Gloucester, and Mercer, New Jersey."
      />
    </>
  );
};

const Anns = ({ dataReader }) =>
  dataReader.isLoading ? (
    <AnnouncementLoader />
  ) : (
    <CSSSlider dimensions="w-full md:w-96 h-40">
      {dataReader.data.anns.map((d) => {
        return <Announcement key={d.guid["#text"]} {...d} />;
      })}
    </CSSSlider>
  );

const Events = ({ dataReader }) =>
  dataReader.isLoading
    ? [...Array(4)].map((_, i) => <EventLoader key={i} />)
    : dataReader.data.events
        .slice(0, 4)
        .map((d) => <Event key={d.StartDate + d.StartTime} {...d} />);

const Products = ({ dataReader }) =>
  dataReader.isLoading
    ? [...Array(6)].map((_, i) => <ProductLoader key={i} />)
    : dataReader.data.pubs.map((d) => <Product key={d.PubId} {...d} />);

const HomePage = ({ data }) => {
  const dataReader = useData();

  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
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
        <div className="w-min bg-gradient-to-r from-white/80 via-white/80 to-transparent md:pr-32">
          <div className="w-full p-4 md:w-96 md:pl-12">
            <Anns dataReader={dataReader} />
          </div>
        </div>
      </Header>
      <main>
        <div className="flex justify-center bg-[#bbe2f2]">
          <div className="container px-8">
            <h3 className="text-3xl">
              <a
                className="text-[#296591] no-underline hover:underline"
                href="https://www.dvrpc.org/Calendar/"
              >
                Events
              </a>
            </h3>
            <div className="flex-auto items-center justify-between md:flex">
              <Events dataReader={dataReader} />
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-[#e4f5f7]">
          <div className="container px-8">
            <h3 className="text-3xl">
              <a
                className="text-[#296591] no-underline hover:underline"
                href="https://www.dvrpc.org/Products/Search/"
              >
                New Releases
              </a>
            </h3>
            <div className="grid-cols-3 pb-8 md:grid">
              <Products dataReader={dataReader} />
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
  }
`;
