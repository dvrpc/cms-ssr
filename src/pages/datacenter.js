import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import { Helmet } from "react-helmet";
import favicon from "../images/favicon.ico";
import LogoBar from "../components/LogoBar";
import TopNav from "../components/TopNav";
import Icon, {
  Search,
  Bikeped,
  Housing,
  Environment,
  Freight,
  Imagery,
  Planning,
  Tip,
  Region,
  Economy,
  Equity,
  Highways,
  Connections2050,
  Health,
  Transit,
  DvrpcMini,
} from "../components/Icon";
import ConnectWithUs from "../components/ConnectWithUs";
import FooterAds from "../components/FooterAds";
import bgImage from "../images/datacenter.jpg";

const NewsLoader = () => <div>Loading...</div>;

const Data = ({ data }) => {
  const location = "/data";
  const title = "Data Center";
  const staffContact = {
    mail: "kkorejko@dvrpc.org",
    field_display_name: "Kim Korejko",
    field_title: "Manager, Data Coordination",
  };
  const menu = { href: location };

  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("https://alpha.dvrpc.org/news/getTop18")
      .then((response) => response.json())
      .then((resultData) => {
        setNews(resultData.filter((r) => r.type === "New Data"));
      });
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <link rel="icon" href={favicon} />
        <style>
          {`:root {
            --color-h1: #0f1a3a;
            --color-h2: #0f1a3a;
            --color-h3: #0f1a3a;
            --bg-cover-image: url(${bgImage});
            --height-banner: 400px;
          }`}
        </style>
      </Helmet>
      <header className="bg-white">
        <LogoBar />
        <div
          className="w-full bg-bottom h-[var(--height-banner)] bg-cover relative after:absolute after:block after:bottom-4 after:right-0 after:p-1 after:px-2 after:pl-64 after:text-gray-900 after:text-sm after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:content-[var(--content-photo-credits)]"
          style={{
            backgroundImage: "var(--bg-cover-image)",
          }}
        ></div>
      </header>
      <TopNav />

      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div className="md:col-span-3 text-center">
            <h1 className="font-bold text-4xl">
              Welcome to the DVRPC Data Center
            </h1>
            <p className="text-2xl">
              where you have access to information about the Greater
              <br />
              Philadelphia region at your fingertips!
            </p>
            <form
              action="http://data.dvrpc.org/dataset/"
              method="GET"
              className="w-full md:w-2/3 inline-block relative"
            >
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA CATALOG OR EXPLORE BELOW"
                className="hidden md:block p-6 pl-20 mt-8 rounded-lg text-xl leading-none w-full outline-2 outline-[#030a18] placeholder:text-[#030a18]/90 placeholder:text-center placeholder:font-extrabold placeholder:text-lg placeholder:tracking-wider"
              />
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA"
                className="md:hidden p-6 mt-8 rounded-lg text-xl leading-none w-full outline-2 outline-[#030a18] placeholder:text-[#030a18]/90 placeholder:text-center placeholder:font-extrabold placeholder:text-lg placeholder:tracking-wider"
              />
              <button className="hidden md:block text-3xl font-bold absolute left-8 top-1/2 leading-none color-[#030a18] -scale-x-100">
                ⌕
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-4 font-bold text-sm">
          <div className="md:col-span-3 text-center">
            <div className="md:grid grid-cols-2 md:grid-cols-7">
              {Object.entries({
                "Bicycle+%26+Pedestrian": Bikeped,
                "Demographics+%26+Housing": Housing,
                Environment: Environment,
                "Freight+%26+Aviation": Freight,
                Imagery: Imagery,
                Planning: Planning,
                TIP: Tip,
                Boundaries: Region,
                Economy: Economy,
                "Equity+%26+Diversity": Equity,
                Roadways: Highways,
                "Long-Range+Plan": Connections2050,
                "Safety+%26+Health": Health,
                Transit: Transit,
              }).map(([category, icon]) => (
                <div key={category} className="my-4">
                  <a
                    className="no-underline hover:underline uppercase"
                    href={`https://data.dvrpc.org/dataset/?category=${category}`}
                    target="_blank"
                  >
                    <Icon
                      use={icon}
                      fillColor="#040b1f"
                      scale={16}
                      className="mx-auto mb-2"
                    />
                    {decodeURIComponent(category).replaceAll("+", " ")}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 color-[#030a18]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-0">
          <div className="md:col-span-3">
            <h2 className="font-bold text-2xl text-center">FEATURED APPS</h2>
            <div className="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300 text-[#155575]">
              {data.allMenuLinkContentMenuLinkContent.edges
                .slice(0, 3)
                .map(({ node }) => {
                  const id = node.link.uri.replace("internal:/", "");
                  return (
                    <div
                      className="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                      key={id}
                    >
                      <a
                        className="flex-none"
                        href={`https://www.dvrpc.org/Products/${id}`}
                      >
                        <img
                          className="float-left w-20 md:w-40 mr-4"
                          src={`https://www.dvrpc.org/asp/pubs/201px/${id}.png`}
                        />
                      </a>
                      <h2>
                        <a href={`https://www.dvrpc.org/products/${id}`}>
                          {node.title}
                        </a>
                      </h2>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#eee] color-[#030a18]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8">
          <div className="md:col-span-3">
            <h2 className="font-bold text-2xl text-center">WHAT'S NEW</h2>
            <div className="md:grid grid-cols-3 items-start justify-between mt-8 md:divide-x divide-gray-300 color-[#155575]">
              {news.slice(0, 3).map(({ id, img, title }) => {
                return (
                  <div
                    className="my-4 md:m-0 px-8 text-lg leading-tight flex items-center"
                    key={id}
                  >
                    <img
                      className="float-left flex-none w-20 md:w-32 mr-4"
                      src={img}
                    />
                    <h2>
                      <a
                        href={`https://www.dvrpc.org/news/?post=${id}#filter-wrapper`}
                      >
                        {title}
                      </a>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="color-[#030a18] bg-[#99c5c8]">
        <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12 p-8 pb-4 md:pb-8">
          <div className="md:col-span-3 text-center">
            <h2 className="font-bold text-2xl">
              ABOUT THE GREATER PHILADELPHIA REGION
            </h2>
            <div className="md:grid md:grid-cols-4 items-stretch justify-between text-xl mt-4 md:mt-8 md:divide-x divide-y md:divide-y-0 text-[#155575]">
              {[
                ["5,893,110", "TOTAL POPULATION"],
                [
                  "370",
                  "MILLION MILES",
                  <>
                    of <strong>UNLINKED TRANSIT TRIPS</strong> per year
                  </>,
                ],
                [
                  "592,000",
                  "ACRES",
                  <>
                    of <strong>PROTECTED LAND</strong>
                  </>,
                ],
                [
                  "23,000",
                  "MILES",
                  <>
                    of <strong>ROADS</strong>
                  </>,
                ],
              ].map(([figure, line1, line2]) => (
                <div className="my-4 md:my-0 pt-4 md:pt-0 px-4 border-[#030a18]">
                  <h3 className="text-3xl font-bold mb-2 text-[#030a18]">
                    {figure}
                  </h3>
                  <div className="font-normal text-xl">{line1}</div>
                  {line2}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex justify-center bg-white">
        <div className="container">
          <FooterAds />
        </div>
      </footer>

      <div className="flex justify-center text-center md:text-left text-[#99c5c8] bg-[#030a18]">
        <div className="container">
          <div className="mt-4 md:flex justify-between">
            <footer className="md:py-4 flow-root">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.field_display_name}
              </a>{" "}
              <small className="text-sm">{staffContact.field_title}</small>
            </footer>
            <ConnectWithUs
              title={title}
              location={`https://www.dvrpc.org${location}`}
              fillColor="#99c5c8"
            />
          </div>
        </div>
      </div>
      <footer className="flex justify-center -mt-1 color-[#99c5c8] bg-[#030a18]">
        <div className="container text-center md:text-left">
          <div className="mb-4 md:flex justify-between">
            <div className="leading-none">
              <Link to="/" className="no-underline">
                <Icon
                  use={DvrpcMini}
                  className="mx-auto md:mx-0 h-8"
                  fillColor="#99C5C8"
                />
              </Link>
              <small>
                190 N Independence Mall West, 8th Floor
                <br />
                Philadelphia, PA 19106-1520
                <br />
                215.592.1800
              </small>
            </div>
            <small className="mt-4 md:m-0 self-end">
              <Link to="/Policies/">Policies</Link> |{" "}
              <a
                href="https://app.e2ma.net/app2/audience/signup/1808352/1403728/"
                rel="noopener"
              >
                Sign Up for Our Email Lists
              </a>
            </small>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Data;

export const query = graphql`
  query {
    allMenuLinkContentMenuLinkContent(
      filter: {
        menu_name: { eq: "data-center-featured-apps" }
        enabled: { eq: true }
      }
      sort: { fields: weight }
    ) {
      edges {
        node {
          title
          link {
            uri
          }
        }
      }
    }
  }
`;
