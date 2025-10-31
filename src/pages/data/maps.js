import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";
import Link from "../../components/Link";
import LogoBar from "../../components/LogoBar";
import Icon, { DvrpcMini } from "../../components/Icon";
import ConnectWithUs from "../../components/ConnectWithUs";
import bgImage from "../../images/datacenter-header.jpg";
import DVRPCbg from "../../images/dvrpc-transparent.png";
import HtmlParser from "../../components/HtmlParser";
import HeadTemplate from "../../components/HeadTemplate";

const trunc = (str) => {
  if (!str) return "";
  return str.length > 250
    ? `${str.substring(0, 250)}${str.substring(250).split(" ")[0]}…`
    : str;
};

const title = "Data Center - Maps and Applications";

const Data = ({ data: { userUser: staffContact }, location }) => {
  const [apps, setApps] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [filter, setFilter] = useState("");
  const resultIncrement = 10;
  useEffect(() => {
    fetch(
      "https://apis.dvrpc.org/internal/dvrpc_products/products/product?tags=Data%20Center&limit=999"
    )
      .then((response) => response.json())
      .then((resultData) => setApps(resultData.items));
  }, []);

  const filteredApps = !filter
    ? apps
    : apps.filter(
        (app) =>
          app.title.toLowerCase().includes(filter.toLowerCase()) ||
          (app.keywords &&
            app.keywords.toLowerCase().includes(filter.toLowerCase()))
      );

  return (
    <div className="flex flex-col">
      <header className="bg-white">
        <LogoBar />
        <div
          className="relative flex h-48 w-full overflow-hidden after:absolute
          after:bottom-4 after:right-0 after:block after:bg-gradient-to-r 
          after:from-transparent after:via-white/80 after:to-white/80 after:p-1 
          after:px-2 after:pl-64 after:text-sm after:text-gray-900 after:content-[var(--content-photo-credits)]"
          style={{
            background: `url(${bgImage})`,
            color: "#fff",
          }}
        >
          <div className="container mx-auto my-auto flex p-8">
            <h1 className="mt-0 text-5xl font-bold text-white">
              Maps & Applications
            </h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 33.78 33.79"
            className="absolute -right-[40%] opacity-50 md:-right-[10%] md:-top-[30%] md:w-1/3"
          >
            <g id="Layer_1-2" data-name="Layer 1">
              <path
                fill="white"
                d="M23.68,1.44C15.15-2.32,5.19,1.55,1.43,10.08c-3.25,7.39-.82,16.04,5.8,20.65L23.68,1.44ZM2.4,23.02l1.42-.9c4.56-2.9,7.91-7.36,9.43-12.55.63-2.45.94-4.97.91-7.5v-1l.07.06s.4.55.29.4c.21.29.4.59.58.9.18.3.33.61.45.93.14.33.25.66.35,1,1.46,4.66.54,9.74-2.46,13.6-.87,1.06-1.88,2-3,2.78-1.79,1.18-3.83,1.94-5.95,2.24-.69.13-1.4.14-2.09.04Z"
              />
              <path
                class="cls-1"
                fill="white"
                d="M26.36,2.93l-16.48,29.33c8.48,3.87,18.49.14,22.37-8.34,3.43-7.5.94-16.37-5.89-20.99ZM20.46,23.93c-.75,2.55-1.16,5.18-1.22,7.84v1l-.07-.07c-.1-.14-.19-.28-.28-.43-.21-.32-.4-.66-.58-1-.16-.32-.31-.66-.43-1-.12-.34-.23-.68-.32-1-1.27-4.74-.24-10.51,3.07-14.19,2.4-2.82,5.8-4.61,9.49-5,.71-.11,1.42-.11,2.13,0l-1.5.9c-4.9,2.93-8.55,7.55-10.29,12.99v-.04Z"
              />
            </g>
          </svg>
        </div>
      </header>
      <div className="bg-[#0078ae] text-white">
        <div className="container mx-auto grid gap-12 px-8 sm:grid-cols-1 md:grid-cols-3">
          <div className="text-left md:col-span-3">
            <ul className="my-3 flex list-none px-0 text-sm md:text-base">
              {/* <li className="flex-1">
                <Link className="no-underline hover:underline" to="/data/about">
                  About
                </Link>
              </li> */}
              <li className="flex-1">
                <a
                  className="!no-underline hover:!underline"
                  href="https://catalog.dvrpc.org/"
                >
                  Data Catalog
                </a>
              </li>
              <li className="flex-1">
                <Link
                  className="font-bold !no-underline hover:!underline"
                  to="/data/maps"
                >
                  Maps & Applications
                </Link>
              </li>
              <li className="flex-1"></li>
              {/* <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/howdoi"
                >
                  Resource Center
                </Link>
              </li> */}
              {/* <li className="flex-1">
                <Link
                  className="no-underline hover:underline"
                  to="/data/stayinformed"
                >
                  Stay Informed
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap p-8 pt-0 md:pt-8">
        <div className="top-0 flex grow basis-1/4 flex-col self-start lg:sticky lg:mt-[1rem]">
          <label className="text-[#0078ae]">
            Search for applications:
            <input
              type="search"
              name="q"
              autoFocus
              className="block w-full rounded-lg border border-gray-200 bg-gray-50 bg-none py-2 px-4 text-xl leading-none text-black text-opacity-80 outline-none transition-all placeholder:text-center placeholder:text-lg placeholder:font-bold placeholder:tracking-wider placeholder:text-[#030a18]/90"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </label>
          <p className="text-sm md:text-base">
            DVRPC develops data visualization and mapping applications to
            enhance data-driven planning outcomes across the Greater
            Philadelphia Region. These applications are built upon the datasets
            found in the{" "}
            <a
              href="https://catalog.dvrpc.org/dataset"
              title="View Data Catalog"
            >
              Data Catalog
            </a>{" "}
            and provide streamlined access to many important subjects.{" "}
          </p>
        </div>
        <div class="flex lg:ml-16 lg:grow-[999] lg:basis-0">
          <div className="flex flex-col space-y-6 divide-y divide-[#53a3c7]">
            {!filteredApps.length && (
              <div className="mt-[1rem] pt-8 text-gray-300">
                No applications matching your search...
              </div>
            )}
            {filteredApps.slice(0, cursor + resultIncrement).map((app) => (
              <div className="py-4 lg:p-4">
                <a
                  className="my-6 text-lg font-bold text-[#0078ae] no-underline hover:underline"
                  href={
                    app.urllink && app.urllink.trim()
                      ? app.urllink
                      : `https://dvrpc.org/products/${app.id}`
                  }
                  target="_blank"
                >
                  {app.title}
                </a>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <img
                    className="w-[402px] border border-gray-300 object-cover sm:max-w-[40%]"
                    src={`https://www.dvrpc.org/asp/pubs/201px/${app.id}.png`}
                  ></img>
                  <span className="text-gray-400">
                    <HtmlParser html={trunc(app.abstract)} />
                  </span>
                </div>
              </div>
            ))}
            {filteredApps.length > resultIncrement && (
              <div className="min-w-100 flex flex-col items-center justify-center">
                <p>
                  Showing{" "}
                  {cursor + resultIncrement <= filteredApps.length
                    ? cursor + resultIncrement
                    : filteredApps.length}{" "}
                  of {filteredApps.length}
                </p>
                <button
                  className="border border-solid border-slate-300 p-3 text-[#0078ae] hover:bg-slate-100"
                  onClick={() => setCursor(cursor + resultIncrement)}
                  style={{
                    display:
                      (cursor >= filteredApps.length ||
                        cursor + resultIncrement >= filteredApps.length) &&
                      "none",
                  }}
                >
                  Load More Results
                </button>
                <button
                  className="mt-5 text-sm text-[#0078ae] hover:underline"
                  id="back-to-top"
                  onClick={() => {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                  }}
                >
                  back to top
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
        <div className="container">
          <div className="mt-4 justify-between md:flex">
            <footer className="flow-root md:py-4">
              <a href={`mailto:${staffContact.mail}`} className="font-bold">
                {staffContact.name}
              </a>{" "}
              <small className="text-sm">{staffContact.title}</small>
            </footer>
            <div className="mx-auto w-max md:mx-0">
              <ConnectWithUs
                title={title}
                location={`https://www.dvrpc.org${location.pathname}`}
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
    </div>
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
    userUser(mail: { eq: "cpollard@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    navItem(href: { regex: "/data/maps/i" }) {
      ...nestednavitem
    }
  }
`;

export default Data;
