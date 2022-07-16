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
          className="relative h-[var(--height-banner)] w-full bg-cover bg-bottom after:absolute after:bottom-4 after:right-0 after:block after:bg-gradient-to-r after:from-transparent after:via-white/80 after:to-white/80 after:p-1 after:px-2 after:pl-64 after:text-sm after:text-gray-900 after:content-[var(--content-photo-credits)]"
          style={{
            backgroundImage: "var(--bg-cover-image)",
          }}
        ></div>
      </header>
      <TopNav />

      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid gap-12 p-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="text-center md:col-span-3">
            <h1 className="text-4xl font-bold">
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
              className="relative inline-block w-full md:w-2/3"
            >
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA CATALOG OR EXPLORE BELOW"
                className="mt-8 hidden w-full rounded-lg p-6 pl-20 text-xl leading-none outline-2 outline-[#030a18] placeholder:text-center placeholder:text-lg placeholder:font-extrabold placeholder:tracking-wider placeholder:text-[#030a18]/90 md:block"
              />
              <input
                type="search"
                name="q"
                autoFocus
                placeholder="SEARCH DATA"
                className="mt-8 w-full rounded-lg p-6 text-xl leading-none outline-2 outline-[#030a18] placeholder:text-center placeholder:text-lg placeholder:font-extrabold placeholder:tracking-wider placeholder:text-[#030a18]/90 md:hidden"
              />
              <button className="color-[#030a18] absolute left-8 top-1/2 hidden -scale-x-100 text-3xl font-bold leading-none md:block">
                ⌕
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-[#b1d0e0] text-[#040b1f]">
        <div className="container mx-auto grid gap-12 p-4 text-sm font-bold sm:grid-cols-1 md:grid-cols-3">
          <div className="text-center md:col-span-3">
            <div className="grid-cols-2 md:grid md:grid-cols-7">
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
                    className="uppercase no-underline hover:underline"
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
      <div className="color-[#030a18] bg-gray-200">
        <div className="container mx-auto grid gap-12 p-8 pb-0 sm:grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-3">
            <h2 className="text-center text-2xl font-bold">FEATURED APPS</h2>
            <div className="mt-8 grid-cols-3 items-start justify-between divide-gray-300 text-[#155575] md:grid md:divide-x">
              {data.allMenuLinkContentMenuLinkContent.edges
                .slice(0, 3)
                .map(({ node }) => {
                  const id = node.link.uri.replace("internal:/", "");
                  return (
                    <div
                      className="my-4 flex items-center px-8 text-lg leading-tight md:m-0"
                      key={id}
                    >
                      <a
                        className="flex-none"
                        href={`https://www.dvrpc.org/Products/${id}`}
                      >
                        <img
                          className="float-left mr-4 w-20 md:w-40"
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
      <div className="color-[#030a18] bg-[#eee]">
        <div className="container mx-auto grid gap-12 p-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-3">
            <h2 className="text-center text-2xl font-bold">WHAT'S NEW</h2>
            <div className="color-[#155575] mt-8 grid-cols-3 items-start justify-between divide-gray-300 md:grid md:divide-x">
              {news.slice(0, 3).map(({ id, img, title }) => {
                return (
                  <div
                    className="my-4 flex items-center px-8 text-lg leading-tight md:m-0"
                    key={id}
                  >
                    <img
                      className="float-left mr-4 w-20 flex-none md:w-32"
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
        <div className="container mx-auto grid gap-12 p-8 pb-4 sm:grid-cols-1 md:grid-cols-3 md:pb-8">
          <div className="text-center md:col-span-3">
            <h2 className="text-2xl font-bold">
              ABOUT THE GREATER PHILADELPHIA REGION
            </h2>
            <div className="mt-4 items-stretch justify-between divide-y text-xl text-[#155575] md:mt-8 md:grid md:grid-cols-4 md:divide-x md:divide-y-0">
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
                <div className="my-4 border-[#030a18] px-4 pt-4 md:my-0 md:pt-0">
                  <h3 className="mb-2 text-3xl font-bold text-[#030a18]">
                    {figure}
                  </h3>
                  <div className="text-xl font-normal">{line1}</div>
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

      <div className="flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container">
          <div className="mt-4 justify-between md:flex">
            <footer className="flow-root md:py-4">
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
      <footer className="color-[#99c5c8] -mt-1 flex justify-center bg-[#030a18]">
        <div className="container text-center md:text-left">
          <div className="mb-4 justify-between md:flex">
            <div className="leading-none">
              <Link to="/" className="no-underline">
                <Icon
                  use={DvrpcMini}
                  className="mx-auto h-8 md:mx-0"
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
            <small className="mt-4 self-end md:m-0">
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
