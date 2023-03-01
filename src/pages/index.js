import React, { Suspense } from "react";
import { graphql } from "gatsby";
import { useAsyncResource } from "use-async-resource";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Announcement, { AnnouncementLoader } from "../components/Announcement";
import Event, { EventLoader } from "../components/Event";
import Product, { ProductLoader } from "../components/Product";
import CSSSlider from "../components/CSSSlider";

import "../styles/Body.css";

const isSSR = typeof window === "undefined";

const fetchData = () =>
  fetch("https://www.dvrpc.org/asp/homepage/default2.aspx").then((r) =>
    r.json()
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

const Anns = ({ dataReader }) => (
  <CSSSlider dimensions="w-full md:w-96 h-40">
    {dataReader().anns.map((d, index) => {
      return <Announcement key={d.guid["#text"]} {...d} />;
    })}
  </CSSSlider>
);

const Events = ({ dataReader }) =>
  dataReader()
    .events.slice(0, 4)
    .map((d) => <Event key={d.StartDate + d.StartTime} {...d} />);

const Products = ({ dataReader }) =>
  dataReader().pubs.map((d) => <Product key={d.PubId} {...d} />);

const HomePage = ({ data }) => {
  const [dataReader] = useAsyncResource(fetchData, []);

  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  return (
    <>
      <Header
        bgStyles={{ backgroundSize: "cover" }}
        alert={
          alert.length ? (
            <div className="bg-black/50 text-center text-white">
              <div
                className="container mx-auto py-6 px-8 text-justify"
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
            {!isSSR && (
              <Suspense fallback={<AnnouncementLoader />}>
                <Anns dataReader={dataReader} />
              </Suspense>
            )}
          </div>
        </div>
      </Header>
      <main>
        <div className="flex justify-center bg-[#bbe2f2]">
          <div className="container mx-8">
            <h3 className="text-3xl">
              <a
                className="no-underline hover:underline text-[#296591]"
                href="https://www.dvrpc.org/Calendar/"
              >
                Events
              </a>
            </h3>
            <div className="flex-auto items-center justify-between md:flex">
              {!isSSR && (
                <Suspense
                  fallback={[...Array(4)].map((_, i) => (
                    <EventLoader key={i} />
                  ))}
                >
                  <Events dataReader={dataReader} />
                </Suspense>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center bg-[#e4f5f7]">
          <div className="container mx-8">
            <h3 className="text-3xl">
              <a
                className="no-underline hover:underline text-[#296591]"
                href="https://www.dvrpc.org/Products/Search/"
              >
                New Releases
              </a>
            </h3>
            <div className="md:grid grid-cols-3 pb-8">
              {!isSSR && (
                <Suspense
                  fallback={[...Array(6)].map((_, i) => (
                    <ProductLoader key={i} />
                  ))}
                >
                  <Products dataReader={dataReader} />
                </Suspense>
              )}
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
