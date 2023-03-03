import * as React from "react";
import HtmlMapper from "./HtmlParser";
import LogoBar from "./LogoBar";
import DVRPCbg from "../images/dvrpc-transparent.png";
import Link from "./Link";
import ConnectWithUs from "./ConnectWithUs";
import Icon, { DvrpcMini } from "./Icon";

const DataPage = ({ data }) => {
  const {
    documents,
    images,
    nodePage: { body, title },
  } = data;

  return (
    <>
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
              <h1 className="text-white">{title}</h1>
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
                    className="no-underline hover:underline"
                    to="/data/maps"
                  >
                    Maps & Applications
                  </Link>
                </li>
                <li className="flex-1">
                  <Link
                    className="no-underline hover:underline"
                    to="/data/howdoi"
                  >
                    Resource Center
                  </Link>
                </li>
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
          <HtmlMapper
            html={body?.processed ?? ""}
            data={{ documents, images }}
          />
        </div>
        <div className="mt-auto flex justify-center bg-[#030a18] text-center text-[#99c5c8] md:text-left">
          <div className="container">
            <div className="mt-4 justify-between md:flex">
              <footer className="flow-root md:py-4">
                <a href={`mailto:kkorejko@dvrpc.org`} className="font-bold">
                  Kim Korejko
                </a>{" "}
                <small className="text-sm">Manager, Data Coordination</small>
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
    </>
  );
};

export default DataPage;
