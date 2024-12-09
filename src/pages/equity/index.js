import React from "react";
import { graphql, Link } from "gatsby";
import LogoBar from "../../components/LogoBar";
import Avatar from "../../components/Avatar";
import Footer from "../../components/Footer";
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
import HeadTemplate from "../../components/HeadTemplate";

const title = "Equity";

const Data = ({
  data: { allMenuLinkContentMenuLinkContent, userUser },
  location,
  serverData,
}) => {
  return (
    <>
      <header className="bg-white">
        <LogoBar />
        <div
          className="relative flex h-[var(--height-banner)] w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cms.dvrpc.org/sites/default/files/2021-12/header68-1600.jpg)`,
          }}
        >
          <div className="m-auto w-1/2 bg-[rgba(55,65,81,0.8)] p-4 text-white">
            <h2 className="text-[1.5rem] font-bold leading-[2rem]">
              DVRPC Equity Hub
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      </header>
      <div className="bg-[#def6ff] text-[#0078ae]">
        <div className="container mx-auto grid gap-12 p-8 text-sm font-bold sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-3">
            <h3 className="text-2xl text-[#0078ae]">What Do You Want To Do?</h3>
            <div className="flex flex-wrap justify-center [&>*]:w-1/3 [&>*]:bg-white">
              <div>
                <h3 className="text-lg">Apply For Funding Opportunities</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-lg">Use Equity Tools & Data</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-lg">Learn About Federal Equity Policy</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-lg">
                  See How DVRPC Is Prioritizing Equity
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div>
                <h3 className="text-lg">See How I Can Prioritize Equity</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="color-[#030a18] flex flex-col bg-gray-200">
        <div className="container mx-auto p-8">
          <h3 className="mb-0 text-2xl font-bold text-[#0078ae]">
            Featured Projects
          </h3>
          <Carousel>
            {allMenuLinkContentMenuLinkContent.edges.map(({ node }) => (
              <AppCard key={node.field_product_id} node={node} />
            ))}
          </Carousel>
        </div>
      </div>

      <div className="bg-gray-300 print:hidden">
        <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
          <div className="-mr-4 items-center justify-between p-4 md:col-span-2 md:col-start-2 md:flex md:p-0">
            <Avatar {...userUser} />
            {location && (
              <ConnectWithUs
                title={title}
                location={`https://www.dvrpc.org${location}`}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const Head = () =>
  HeadTemplate({
    title,
    summary:
      "The DVRPC Data Center centralizes access to data and applications published by DVRPC for planning purposes. Watch this space for future content and enhancements as we continue to develop this site.",
    css: `:root {
      --color-h1: #0f1a3a;
      --color-h2: #0f1a3a;
      --color-h3: #0f1a3a;
      --bg-cover-image: url(${bgImage});
      --height-banner: 20vw;
    }`,
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "sakins@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    allMenuLinkContentMenuLinkContent(
      filter: {
        menu_name: { eq: "data-center-featured-apps" }
        enabled: { eq: true }
      }
      sort: { weight: ASC }
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
    navItem(href: { regex: "/data/i" }) {
      ...nestednavitem
    }
  }
`;

export default Data;
