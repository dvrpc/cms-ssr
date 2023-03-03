import React, { useEffect, useRef, useState } from "react";
import favicon from "../../images/favicon.ico";
import Link from "../../components/Link";
import LogoBar from "../../components/LogoBar";
import Icon, { DvrpcMini } from "../../components/Icon";
import ConnectWithUs from "../../components/ConnectWithUs";
import bgImage from "../../images/datacenter.jpg";
import DVRPCbg from "../../images/dvrpc-transparent.png";

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

const Data = () => {
  const location = "/data";
  const title = "Data Center - Maps and Applications";
  const staffContact = {
    mail: "cpollard@dvrpc.org",
    field_display_name: "Chris Pollard",
    field_title: "Manager, Office of GIS",
  };
  const [apps, setApps] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [filter, setFilter] = useState("");
  const resultIncrement = 10;
  useEffect(() => {
    fetch("https://www.dvrpc.org/api/products?type=WEB&limit=999")
      .then((response) => response.json())
      .then((resultData) => setApps(resultData));
  }, []);

  const filteredApps = !filter
    ? apps
    : apps.filter((app) => app.Title.toLowerCase().includes(filter));

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
            background: `linear-gradient(131deg, rgba(0, 120, 174, 1) 0%, rgba(92, 79, 146, 1) 68.5%, rgba(75, 66, 113, 1) 100%)`,
            color: "#fff",
          }}
        >
          <div className="container mx-auto my-auto flex p-8">
            <h1 className="text-white">Maps & Applications</h1>
          </div>
          <img
            className="absolute -right-[20%] w-3/4 md:-right-[10%] md:-top-[30%] md:w-1/3"
            src={DVRPCbg}
          ></img>
        </div>
      </header>
      <div className="bg-[#5c4f92] text-white">
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
                  className="no-underline hover:underline"
                  href="https://catalog.dvrpc.org/"
                >
                  Data Catalog
                </a>
              </li>
              <li className="flex-1">
                <Link
                  className="font-bold underline hover:underline"
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
              className="w-full rounded-lg text-xl leading-none outline-none placeholder:text-center placeholder:text-lg placeholder:font-bold placeholder:tracking-wider placeholder:text-[#030a18]/90 md:block"
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
              href="https://www.catalog.dvrpc.org/dataset"
              title="View Data Catalog"
            >
              Data Catalog
            </a>{" "}
            and provide streamlined access to many important subjects.{" "}
          </p>
        </div>
        <div class="flex lg:ml-16 lg:grow-[999] lg:basis-0">
          <div className="flex flex-col space-y-6 divide-[#53a3c7] divide-y">
            {!filteredApps.length && (
              <div className="mt-[1rem] pt-8 text-gray-300">
                No applications matching your search...
              </div>
            )}
            {filteredApps.slice(0, cursor + resultIncrement).map((app) => (
              <div className="py-4 lg:p-4">
                <a
                  className="my-6 text-lg font-bold text-[#0078ae] no-underline hover:underline"
                  href={app.Urllink}
                  target="_blank"
                >
                  {app.Title}
                </a>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                  <img
                    className="w-[201px] object-cover"
                    src={`https://www.dvrpc.org/asp/pubs/201px/${app.Id}.png`}
                  ></img>
                  <span className="text-gray-400">
                    {app.Abstract
                      ? app.Abstract.slice(0, 250).trim() + "..."
                      : ""}
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
    </div>
  );
};

export default Data;
