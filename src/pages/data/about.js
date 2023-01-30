import React, { useEffect, useState } from "react";
import { graphql, Link } from "gatsby";
import favicon from "../../images/favicon.ico";
import LogoBar from "../../components/LogoBar";
import Icon, {
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
} from "../../components/Icon";
import ConnectWithUs from "../../components/ConnectWithUs";
import bgImage from "../../images/datacenter.jpg";
import Banner from "../../components/datacenter/Banner";
import AppCard from "../../components/datacenter/AppCard";
import Carousel from "../../components/common/Carousel";

const NewsLoader = () => <div>Loading...</div>;

export const Head = () => {
  return (
    <>
      <link rel="icon" href={favicon} />
      <style>
        {`:root {
      --color-h1: #0f1a3a;
      --color-h2: #0f1a3a;
      --color-h3: #0f1a3a;
      --bg-cover-image: url(${bgImage});
      --height-banner: 25vw;
    }`}
      </style>
    </>
  );
};

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
      <header className="bg-white">
        <LogoBar />
        <Banner />
      </header>
      <div className="bg-[#5c4f92] text-white">
        <div className="container mx-auto grid gap-12 px-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="text-center md:col-span-3">
            <ul className="my-3 flex list-none justify-items-stretch">
              <li className="flex-1">
                <Link className="no-underline hover:underline" to="/data/about">
                  About
                </Link>
              </li>
              <li className="flex-1">
                <a
                  className="no-underline hover:underline"
                  href="https://data.dvrpc.org/"
                >
                  Data Catalog
                </a>
              </li>
              <li className="flex-1">
                <Link className="no-underline hover:underline" to="/data/maps">
                  Maps and Apps
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/howdoi"
                >
                  How do I?
                </Link>
              </li>
              <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/stayinformed"
                >
                  Stay Informed
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#b1d0e0] text-[#0078ae]">
        <div className="container mx-auto grid gap-12 p-8 text-sm font-bold sm:grid-cols-1 md:grid-cols-3">
          <div className="text-center md:col-span-3">
            <h3 className="text-left text-[#0078ae]">Browse by Topic</h3>
            <div className="grid-cols-2 md:grid md:grid-cols-7">
              {Object.entries({
                "Bicycle+%26+Pedestrian": Bikeped,
                Boundaries: Region,
                "Demographics+%26+Housing": Housing,
                Economy: Economy,
                Environment: Environment,
                "Equity+%26+Diversity": Equity,
                "Freight+%26+Aviation": Freight,
                Imagery: Imagery,
                "Long-Range+Plan": Connections2050,
                Planning: Planning,
                Roadways: Highways,
                "Safety+%26+Health": Health,
                TIP: Tip,
                Transit: Transit,
              }).map(([category, icon]) => (
                <div key={category} className="my-4">
                  <a
                    className="uppercase no-underline hover:underline"
                    href={`https://catalog.dvrpc.org/dataset/?category=${category}`}
                    target="_blank"
                  >
                    <Icon
                      use={icon}
                      fillColor="#0078ae"
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

      <div className="flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container">
          <div className="mt-4 justify-between md:flex">
            <footer className="flow-root md:py-4">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.field_display_name}
              </a>{" "}
              <small className="text-sm">{staffContact.field_title}</small>
            </footer>
            <div className="mx-auto w-max md:mx-0">
              <ConnectWithUs
                title={title}
                location={`https://www.dvrpc.org${location}`}
                fillColor="#99c5c8"
              />
            </div>
          </div>
        </div>
      </div>
      <footer className="-mt-1 flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container md:text-left">
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
          entity {
            title
            body {
              processed
            }
            field_product_id
            field_url {
              uri
            }
          }
        }
      }
    }
  }
`;