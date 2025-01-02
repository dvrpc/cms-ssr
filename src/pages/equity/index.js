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
import HeadTemplate, { themeToCustomVars } from "../../components/HeadTemplate";

const title = "Equity";

const Data = ({
  data: { userUser, nodeTheme, allNodeFeaturedEquityProject },
  location,
  serverData,
}) => {
  return (
    <>
      <header className="bg-white">
        <LogoBar />
        <div className="relative flex h-[200px] w-full bg-[#005475]">
          <h2 className="container m-auto mx-auto p-8 text-4xl font-bold leading-[2rem] text-white">
            DVRPC Equity Hub
          </h2>
        </div>
      </header>
      <div className="bg-[#e5e7eb] text-[#005475]">
        <div className="container mx-auto p-8 text-sm font-bold">
          <h3 className="mb-4 text-2xl">What Do You Want To Do?</h3>
          <div className="grid grid-cols-3 justify-center gap-4 [&>*]:bg-white [&>*]:p-4">
            <div>
              <a className="text-lg" href="/equity-funding-opportunities/">
                Apply For Funding Opportunities
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <a className="text-lg" href="/equity-tools-and-data/">
                Use Equity Tools & Data
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <a className="text-lg" href="/equity-policies/">
                Learn About Federal Equity Policy
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <a className="text-lg" href="/prioritizing-equity/">
                See Equity Projects Across the Region
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="color-[#030a18] flex flex-col">
        <div className="container mx-auto p-8">
          <h3 className="mb-0 text-2xl font-bold text-[#0078ae]">
            Featured Equity Projects
          </h3>
          <Carousel>
            {allNodeFeaturedEquityProject.edges.map(({ node }) => (
              <div className="mx-1 flex min-w-[90%] snap-center break-inside-avoid flex-col bg-white p-[0.25em] md:mx-2 md:min-w-[375px]">
                <div className="relative overflow-hidden">
                  <img
                    className="h-[200px] w-full object-cover object-center"
                    src={node.relationships.field_image.url}
                  />
                </div>
                <div className="divide-y divide-slate-300 px-2">
                  <div className="mb-[1rem] min-h-[77px]">
                    <h4 className="m-0 w-full pt-3 text-lg text-[#0078ae]">
                      <a
                        className="cursor-pointer no-underline hover:underline"
                        href={node.field_projecturl.uri}
                        target="_blank"
                      >
                        {node.title}
                      </a>
                    </h4>
                  </div>
                  {node.body.processed && (
                    <div
                      className="text-base text-slate-400"
                      dangerouslySetInnerHTML={{
                        __html: node.body.processed,
                      }}
                    ></div>
                  )}
                </div>
              </div>
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

export const Head = ({ data }) => {
  const { nodeTheme } = data;
  return HeadTemplate({
    title,
    summary: "",
    css: themeToCustomVars(nodeTheme),
  });
};

export const query = graphql`
  query {
    userUser(mail: { eq: "sakins@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    allNodeFeaturedEquityProject {
      edges {
        node {
          title
          body {
            processed
          }
          relationships {
            field_image {
              url
            }
          }
          field_projecturl {
            uri
          }
        }
      }
    }
    nodeTheme(id: { eq: "b806b0f0-5e4c-5b9a-9d9e-efece9e24031" }) {
      field_primary_color
      field_secondary_color
      field_third_color
      field_photo_credits
      relationships {
        field_banner_2x {
          uri {
            url
          }
          id
        }
        field_banner {
          uri {
            url
          }
          id
        }
      }
    }
  }
`;

export default Data;
