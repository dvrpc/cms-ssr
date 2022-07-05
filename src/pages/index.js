import React, { Suspense } from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { useAsyncResource } from "use-async-resource";

import Header from "../components/Header";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import Announcement, { AnnouncementLoader } from "../components/Announcement";
import Event, { EventLoader } from "../components/Event";
import Product, { ProductLoader } from "../components/Product";
import CSSSlider from "../components/CSSSlider";

import "../styles/Body.css";
import MobileHeader from "../components/MobileHeader";
import FooterAds from "../components/FooterAds";
import SectionMenu from "../components/SectionMenu";
import MobileNav from "../components/MobileNav";
import MobileFooter from "../components/MobileFooter";

export const isSSR = typeof window === "undefined";

const fetchData = () =>
  fetch(`https://www.dvrpc.org/asp/homepage/default2.aspx`).then((r) =>
    r.json()
  );

const Anns = ({ dataReader }) => (
  <CSSSlider dimensions={"w-full md:w-96 h-40"}>
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

  const AnnouncementSlider = () => {
    return (
      <div className="md:w-min md:pr-32 bg-gradient-to-r from-white/80 via-white/80 to-transparent">
        <div className="p-4 md:pl-12 md:w-96">
          {!isSSR && (
            <Suspense fallback={<AnnouncementLoader />}>
              <Anns dataReader={dataReader} />
            </Suspense>
          )}
        </div>
      </div>
    );
  };

  const alert = data.blockContentAlertBanner?.body?.processed ?? "";
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Delaware Valley Regional Planning Commission</title>
        <meta
          name="description"
          content="The Delaware Valley Regional Planning Commission is the federally designated Metropolitan Planning Organization for nine counties: Bucks, Chester, Delaware, Montgomery, and Philadelphia, Pennsylvania; and Burlington, Camden, Gloucester, and Mercer, New Jersey."
        />
      </Helmet>
      <MobileHeader
        children={<AnnouncementSlider />}
        alert={alert.length ? alert : ""}
        isIndex={true}
      />
      <MobileNav isIndex={true} />
      <Header
        bgStyles={{ backgroundSize: "cover" }}
        alert={
          alert.length ? (
            <div className="text-white text-center bg-black/50">
              <div
                className="mx-auto container p-6 xl:px-0"
                dangerouslySetInnerHTML={{ __html: alert }}
              />
            </div>
          ) : (
            ""
          )
        }
        children={<AnnouncementSlider />}
      />
      <TopNav />
      <div className="md:hidden py-10 px-4 bg-gray-500">
        <SectionMenu />
      </div>
      <main>
        <div id="events-section" className="flex justify-center bg-[#bbe2f2]">
          <div className="container mx-8 flex-auto items-center justify-between md:flex">
            <h3>
              <a
                className="text-3xl mr-4 text-[#296591]"
                href="https://www.dvrpc.org/Calendar/"
              >
                Events
              </a>
            </h3>
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

        <div className="flex justify-center bg-[#e4f5f7]">
          <div className="container mx-8 py-4 flex flex-col md:flex-row items-center gap-12">
            <div
              id="releases-section"
              className="md:w-3/4 border-gray-300 md:border-r"
            >
              <h3 className="mb-4 text-3xl">
                <a
                  className="text-[#296591]"
                  href="https://www.dvrpc.org/Products/Search/"
                >
                  New Releases
                </a>
              </h3>
              <div className="flex flex-wrap">
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
            <div id="links-section" className="w-full md:w-1/4">
              <h3 className="text-3xl text-[#296591] underline">Quick Links</h3>
              <ul className="my-8">
                <li>
                  <a href="https://www.dvrpc.org/business">
                    Business Opportunities
                  </a>
                </li>
                <li>
                  <a href="https://www.dvrpc.org/committees/board">
                    Board Resources
                  </a>
                </li>
                <li>
                  <a href="https://www.dvrpc.org/committees/">Committees</a>
                </li>
                <li>
                  <a href="https://www.dvrpc.org/humanresources">
                    Jobs at DVRPC
                  </a>
                </li>
                <li>
                  <a href="https://www.dvrpc.org/news">News</a>
                </li>
                <li>
                  <a href="https://www.dvrpc.org/dataproducts">Data</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="featured-section" className="md:hidden mx-8 mb-20">
          <h3 className="text-3xl text-[#296591] underline">Featured</h3>
          <FooterAds />
        </div>
      </main>
      <MobileFooter />
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
