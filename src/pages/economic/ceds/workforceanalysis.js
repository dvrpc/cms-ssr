import React, { useState } from "react";
import BubbleChart from "../../../components/ceds/BubbleChart";
import BarChart from "../../../components/ceds/BarChart";
import Stats from "../../../components/ceds/Stats";
import regionsMap from "../../../configs/regionsMap";
import { graphql, Link } from "gatsby";
import HeadTemplate, {
  themeToCustomVars,
  defaultThemeConfig,
} from "../../../components/HeadTemplate";
import Avatar from "../../../components/Avatar";
import ConnectWithUs from "../../../components/ConnectWithUs";
import Modal from "../../../components/Modal";
import LogoBar from "../../../components/LogoBar";
import Banner from "../../../images/cedsheader.jpg";
import Icon, { Search } from "../../../components/Icon";
import Footer from "../../../components/Footer";
import workbook from "./data.json";

const title = "Workforce Analysis";

const WorkForceAnalysis = ({ data, location }) => {
  const { userUser } = data;
  const [geography, setGeography] = useState("ATL");
  const [activeChart, setActiveChart] = useState("total");

  const toggleModal = (event) => {
    event.preventDefault();
    document.getElementById("modal-background").classList.toggle("hidden");
    document.getElementById("modal").classList.toggle("hidden");
  };

  const legend = {
    "Accommodation and Food Services": "#AA2725",
    "Administrative and Support and Waste Management and Remediation Services":
      "#F36F31",
    "Arts, Entertainment, and Recreation": "#6566AE",
    Construction: "#5D744C",
    "Educational Services": "#4B7436",
    "Finance and Insurance": "#F89521",
    "Health Care and Social Assistance": "#27255E",
    Information: "#989A9B",
    Manufacturing: "#9D83BC",
    "Other Services (except Public Administration)": "#806FAC",
    "Professional, Scientific, and Technical Services": "#8CBC73",
    "Real Estate and Rental and Leasing": "#EA5637",
    "Retail Trade": "#EBA651",
    "Transportation and Warehousing": "#D11F45",
    Utilities: "#4D3189",
    "Wholesale Trade": "#A75BA4",
  };

  return (
    <>
      <header className="bg-white print:hidden">
        <LogoBar />
        <div
          className="relative h-[200px] w-full bg-cover bg-center md:h-[250px]"
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="container mx-auto p-8">
            <form
              className="relative mb-4 bg-gradient-to-r from-white/80 via-white/80 to-transparent md:w-min md:pr-32"
              action="https://www.dvrpc.org/Search/"
            >
              <div className="pointer-events-none absolute flex h-full w-10 items-center justify-center">
                <Icon
                  use={Search}
                  className="inline-block h-6 flex-shrink-0 select-none text-gray-600"
                />
              </div>
              <div>
                <input
                  name="q"
                  placeholder="Search..."
                  aria-label="Search"
                  className="m-0 block w-72 min-w-0 border-0 border-none bg-transparent p-2 pl-10 placeholder-gray-600 focus:outline-none md:pl-12"
                />
              </div>
            </form>
          </div>
        </div>
      </header>
      <div className="my-8">
        <Modal toggleModal={toggleModal}>
          <div className="px-8 py-4 text-[#666666]">
            <p>
              Recent world events have expedited the advancement of digital
              technologies and digitalization of the economy, altering where and
              how we work (telework), as well as produce and distribute goods
              and services (automation). Increased and rapid digitalization of
              the economy has implications for everything from regional housing
              markets and land use decisions, to unemployment rates and supply
              chains.
            </p>
            <p className="mt-4">
              However, digitalization has advanced at differing degrees between
              occupations and within industry sectors. Automation Risk and
              Telework Capacity scores were developed in order to quantify
              digital adoption at the sector-level. These scores were then used
              to chart the state of digitalization of Greater Philadelphia’s
              economy, as well as the economies of nine peer regions, by
              focusing on the High-Performance Industries (HPI) within each
              region.
            </p>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="mt-4 font-bold">The Peer Regions</p>
                <p>
                  Nine peer regions were chosen based on geographic location,
                  distribution, and similarities. It was capped at nine to keep
                  the entire analysis effort limited to a total of ten regions,
                  including Greater Philadelphia.
                </p>
                <p className="my-4">
                  Since Greater Philadelphia only shares a state with one other
                  major US city, Pittsburgh, that region was included in order
                  to capture this unique intra-state dynamic. Given Greater
                  Philadelphia’s central location along the Northeast Corridor,
                  four peer cities were selected from that region as well:
                  Baltimore, Boston, New York City, and Washington D.C. The
                  remaining four regions were chosen based on their distribution
                  across the US: the Midwest (Chicago), Southeast (Atlanta),
                  West (Dallas), and West Coast (Los Angeles).
                </p>
                <p className="mt-4 font-bold">High-Performance Industries</p>
                <p>
                  For the purposes of this analysis, HPIs are those industries
                  for which the location quotient (LQ), in terms of total
                  employment, is 1.25 or higher. LQ is calculated by dividing
                  the region's total industry-level employment by the nation's
                  total industry-level employment. An LQ of 1.0 indicates that a
                  specific industry is equally represented in the region as it
                  is nationally, and an LQ less than 1.0 indicates that the
                  industry is less represented regionally than nationally.
                  Conversely, an LQ greater than 1.0 indicates that an industry
                  has a greater share of total employment at the regional level
                  than the national level.
                </p>
              </div>
              <div>
                <p className="mt-4 font-bold">Automation Risk Methodology</p>
                <p>
                  The Oxford Martin School’s publication,{" "}
                  <i>The Future of Employment</i>, sought to quantify the degree
                  to which specific occupations are susceptible to
                  computerization. The analysis was done utilizing data from the
                  U.S. Department of Labor’s online platform, O*NET Resource
                  Center. Sector-level risk was calculated by determining the
                  occupational employment composition of each sector, and then
                  multiplying each occupation’s automation risk by its
                  percentage of total employment within each subsector. The
                  values were then summed to calculate its automation risk by
                  sector.
                </p>
                <p className="mt-4 font-bold">Telework Capacity Methodology</p>
                <p>
                  Released in November 2022, the U.S. Bureau of Labor
                  Statistics’ (BLS) Occupational Requirements Survey (ORS)
                  provides estimates on a range of requirements at the
                  occupational level. Each requirement falls within one of seven
                  categories: physical demands, environmental conditions,
                  education, training, and experience, as well as cognitive and
                  mental requirements. Due to gaps in the ORS, the BLS’ Business
                  Response Survey (BRS) was used to determine telework capacity
                  at the sector-level. However, since the BRS defines telework
                  capacity as establishments with employees teleworking either
                  all the time, some of the time, and or rarely or never, the
                  following formula was developed to quantify telework capacity:
                </p>
                <p className="my-4">
                  Telework Score = ((Percent of establishments with employees
                  teleworking all the time * 10) + (Percent of establishments
                  with employees teleworking some of the time * 5) + (Percent of
                  establishments with employees teleworking rarely or never *
                  1))/1000
                </p>
                <p className="font-bold">For More Information:</p>
                <p>
                  Spencer Gober | Manager, Office of Community and Economic
                  Development{" "}
                  <a href="mailto:sgober@dvrpc.org" className="underline">
                    sgober@dvrpc.org
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Modal>
        <div className="container mx-auto mb-8 px-8 md:grid-cols-[auto_1fr]">
          <Link
            className="mb-4 flex font-bold text-[#646464] no-underline hover:underline"
            to="/economic/workforce/"
          >
            <span className="my-auto mr-2 flex h-5 w-5 rounded-full bg-[#646464] font-bold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-ml-[0.1rem] h-full w-full scale-50 fill-current"
              >
                <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
              </svg>
            </span>
            Back to Workforce Development
          </Link>
          <div className="flex flex-col text-[#662d91] md:flex-row md:items-center">
            <h1 className="mt-1 mb-2 max-w-[80ch] text-4xl font-bold print:max-w-full print:p-0 md:col-span-2 md:col-start-2 md:p-0">
              Comparing Regional Economies: Workforce Automation and Telework
            </h1>
            <button className="flex font-bold md:ml-8" onClick={toggleModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0,0,256,256"
                width="26px"
                height="26px"
                className="mr-2"
              >
                <g
                  fill="#60368c"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(9.84615,9.84615)">
                    <path d="M13,1.1875c-6.52344,0 -11.8125,5.28906 -11.8125,11.8125c0,6.52344 5.28906,11.8125 11.8125,11.8125c6.52344,0 11.8125,-5.28906 11.8125,-11.8125c0,-6.52344 -5.28906,-11.8125 -11.8125,-11.8125zM15.46094,19.49609c-0.60937,0.23828 -1.09375,0.42188 -1.45703,0.54688c-0.36328,0.125 -0.78125,0.1875 -1.26172,0.1875c-0.73437,0 -1.30859,-0.17969 -1.71875,-0.53906c-0.40625,-0.35547 -0.60937,-0.8125 -0.60937,-1.36719c0,-0.21484 0.01563,-0.43359 0.04688,-0.65625c0.02734,-0.22656 0.07813,-0.47656 0.14453,-0.76172l0.76172,-2.6875c0.06641,-0.25781 0.125,-0.5 0.17188,-0.73047c0.04688,-0.23047 0.06641,-0.44141 0.06641,-0.63281c0,-0.33984 -0.07031,-0.58203 -0.21094,-0.71484c-0.14453,-0.13672 -0.41406,-0.20312 -0.8125,-0.20312c-0.19531,0 -0.39844,0.03125 -0.60547,0.08984c-0.20703,0.0625 -0.38281,0.12109 -0.53125,0.17578l0.20313,-0.82812c0.49609,-0.20312 0.97266,-0.375 1.42969,-0.51953c0.45313,-0.14453 0.88672,-0.21875 1.28906,-0.21875c0.73047,0 1.29688,0.17969 1.69141,0.53125c0.39453,0.35156 0.59375,0.8125 0.59375,1.375c0,0.11719 -0.01172,0.32422 -0.03906,0.61719c-0.02734,0.29297 -0.07812,0.5625 -0.15234,0.8125l-0.75781,2.67969c-0.0625,0.21484 -0.11719,0.46094 -0.16797,0.73438c-0.04687,0.27344 -0.07031,0.48438 -0.07031,0.625c0,0.35547 0.07813,0.60156 0.23828,0.73047c0.15625,0.12891 0.43359,0.19141 0.82813,0.19141c0.18359,0 0.39063,-0.03125 0.625,-0.09375c0.23047,-0.06641 0.39844,-0.12109 0.50391,-0.17187zM15.32422,8.61719c-0.35156,0.32813 -0.77734,0.49219 -1.27344,0.49219c-0.49609,0 -0.92578,-0.16406 -1.28125,-0.49219c-0.35547,-0.32812 -0.53125,-0.72656 -0.53125,-1.19141c0,-0.46484 0.17969,-0.86719 0.53125,-1.19922c0.35547,-0.33203 0.78516,-0.49609 1.28125,-0.49609c0.49609,0 0.92188,0.16406 1.27344,0.49609c0.35547,0.33203 0.53125,0.73438 0.53125,1.19922c0,0.46484 -0.17578,0.86328 -0.53125,1.19141z"></path>
                  </g>
                </g>
              </svg>
              About
            </button>
          </div>
          <div className="hidden h-64 flex-col justify-center max-[428px]:flex">
            <svg
              id="_ÎÓÈ_1"
              data-name="—ÎÓÈ_1"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 1294.17 1294.17"
              className="h-16"
            >
              <g>
                <path
                  class="cls-1"
                  d="M815.96,1267.98L26.19,478.21c-34.92-34.92-34.91-91.73,0-126.64L351.57,26.19c34.92-34.92,91.73-34.92,126.64,0l789.77,789.77c34.91,34.91,34.92,91.73,0,126.64l-325.39,325.39c-34.91,34.91-91.73,34.91-126.64,0ZM47.4,372.79c-23.22,23.22-23.22,61,0,84.21l789.77,789.77c23.22,23.22,61,23.22,84.21,0l325.39-325.39c23.22-23.22,23.22-61,0-84.21L457,47.4c-23.22-23.22-61-23.22-84.21,0L47.4,372.79Z"
                />
                <path
                  class="cls-1"
                  d="M243.48,276.68l50.36-50.36c4.88-4.88,4.88-12.8,0-17.68-4.88-4.88-12.8-4.88-17.68,0l-50.36,50.36c-4.88,4.88-4.88,12.8,0,17.68s12.8,4.88,17.68,0Z"
                />
                <circle
                  class="cls-1"
                  cx="202.1"
                  cy="300.38"
                  r="9.89"
                  transform="translate(-159.75 288.7) rotate(-54.22)"
                />
                <circle class="cls-1" cx="1022.97" cy="1022.83" r="33.61" />
              </g>
              <g>
                <path
                  class="cls-1"
                  d="M755.28,167.81c-5.86,5.86-15.36,5.86-21.21,0l-55.63-55.63s-.03-.04-.05-.06c-.1-.1-.2-.22-.29-.33-5.49-5.88-5.39-15.09.35-20.83,2.06-2.06,4.58-3.39,7.23-3.99l63.8-38.73c7.08-4.3,16.31-2.04,20.61,5.04,3.66,6.03,2.57,13.61-2.2,18.39-.83.83-1.78,1.58-2.83,2.22l-26.16,15.88c118.74,13.03,228.93,65.69,314.38,151.15,97.22,97.22,152.01,226.45,154.26,363.89.07,4.23-1.62,8.08-4.39,10.85s-6.31,4.32-10.36,4.39c-8.28.14-15.11-6.47-15.24-14.75-2.13-129.61-53.79-251.48-145.48-343.17-82.53-82.53-189.52-132.63-304.59-143.36l27.83,27.83c5.86,5.86,5.86,15.36,0,21.21Z"
                />
                <path
                  class="cls-1"
                  d="M529.06,1220.21l26.16-15.88c-118.74-13.03-228.93-65.69-314.38-151.15-97.22-97.22-152.01-226.46-154.26-363.89-.14-8.28,6.47-15.11,14.75-15.24,8.28-.14,15.11,6.47,15.24,14.75,2.13,129.61,53.79,251.48,145.48,343.17,82.53,82.53,189.52,132.63,304.59,143.36l-27.83-27.83c-5.86-5.86-5.86-15.36,0-21.21,5.86-5.86,15.36-5.86,21.21,0l55.63,55.63s.03.04.05.06c.1.11.2.22.3.33,5.49,5.88,5.38,15.09-.35,20.82-2.06,2.06-4.59,3.39-7.24,4l-63.79,38.73c-7.08,4.3-16.31,2.04-20.61-5.04-4.3-7.08-2.04-16.31,5.04-20.61Z"
                />
              </g>
            </svg>
            <p className="px-4 text-center text-lg">
              Rotate your phone for the best viewing experience
            </p>
          </div>
          <div className="max-[428px]:hidden">
            <p className="mb-4 text-[1.5rem] leading-[2rem]">
              Digitally enabled telework and automation have significant
              implications for the future of the workforce, and the region's
              economy. Since telework capacity and automation risk differ from
              one industry to the next, it is important to understand the
              composition of Greater Philadelphia's industry mix in order to
              anticipate the future impacts of these forces.
            </p>
            <h2 className="text-[1.5rem] font-bold leading-[2rem] text-[#2b1956]">
              Identifying High-Performance Industries
            </h2>
            <p className="mb-6">
              In the bubble chart below, toggle between peer regions to
              understand how Greater Philadelphia’s industry mix, in terms of
              total employment within each industry, differs from one region to
              the next. This chart can be used to determine which industries are
              of particular importance to the overall health of the regional
              economy, and considered to be a High-Performance Industry (HPI)
              for that region.
            </p>
            <div className="mb-2 flex flex-col text-lg font-bold md:mt-0 md:flex-row md:items-center">
              <h3>Greater Philadelphia</h3>
              <h3 className="mx-1">vs.</h3>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[20%] right-1 z-10 h-7 w-7 rotate-[270deg] scale-75 rounded-full bg-[#EB983E] fill-current p-[0.18rem] pr-2 text-white"
                >
                  <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
                </svg>
                <select
                  className="workforce-select relative z-20 w-[11.5rem] rounded-md border border-[#707070] bg-transparent p-2"
                  id="geography"
                  autoComplete="off"
                  onChange={(e) => setGeography(e.target.value)}
                  value={geography}
                >
                  {Object.keys(workbook)
                    .slice(2, -2)
                    .map((name) => (
                      <option key={name} value={name}>
                        {regionsMap[name]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* <div className="mt-4 flex flex-col flex-wrap md:mt-0">
              {Object.keys(legend).map((key) => (
                <div className="flex items-center">
                  <span
                    className="mx-1 h-2 w-2 rounded-full"
                    style={{ backgroundColor: legend[key] }}
                  />
                  <span className="text-sm">{key}</span>
                </div>
              ))}
            </div> */}

            {workbook && (
              <>
                <div className="-ml-[1.4rem] h-[60vh]">
                  <BubbleChart
                    workbook={workbook}
                    geography={geography}
                  ></BubbleChart>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          className="pt-10 max-[428px]:hidden"
          style={{
            background:
              "linear-gradient(to bottom, #0000001A 0%, #FFFFFF00 175px)",
          }}
        >
          <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
            <h2 className="text-[1.5rem] font-bold leading-[2rem] text-[#2b1956]">
              Planning for Automation Risk and Telework Capacity
            </h2>
            <p className="my-2">
              Regions reliant on HPIs with higher telework capacity may need to
              adopt policies aimed at talent retention and quality of life
              improvements to offset the potentially negative impacts of remote
              work. Conversely, regions where automation risk is higher among
              HPIs may face increased challenges related to the reskilling and
              upskilling of a displaced workforce.
            </p>
            <p className="my-2">
              Use the drop-down button to toggle between the bar charts below
              and to compare Greater Philadelphia’s economy, in terms of
              employment, automation risk, and telework capacity within each
              HPI, to that of the nine peer regions.
            </p>
            <div className="relative w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[27%] right-1 z-10 h-7 w-7 rotate-[270deg] scale-75 rounded-full bg-[#EB983E] fill-current p-[0.18rem] pr-2 text-white"
              >
                <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
              </svg>
              <select
                className="workforce-select relative z-20 my-2 w-32 rounded-md border border-[#707070] bg-transparent p-2 font-bold"
                id="chart-toggle"
                autoComplete="off"
                onChange={(e) => setActiveChart(e.target.value)}
                defaultValue={"total"}
              >
                <option value="total">Total</option>
                <option value="automation">Automation</option>
                <option value="telework">Telework</option>
              </select>
            </div>

            {workbook && (
              <>
                <Stats
                  workbook={workbook}
                  geography={geography}
                  activeChart={activeChart}
                />
                <div className="h-[60vh]">
                  <BarChart
                    workbook={workbook}
                    geography={geography}
                    activeChart={activeChart}
                  ></BarChart>
                </div>
              </>
            )}
          </div>
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

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary: "Economic Data Viz.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "sgober@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    nodeTheme(id: { eq: "cbc0c1f4-504c-5f00-b03a-c85f5479e5f4" }) {
      field_primary_color
      field_secondary_color
      field_third_color
      field_photo_credits
      relationships {
        field_banner_2x {
          uri {
            url
          }
        }
        field_banner {
          uri {
            url
          }
        }
      }
    }
  }
`;

export default WorkForceAnalysis;
