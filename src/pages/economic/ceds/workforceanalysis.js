import React, { useEffect, useRef, useState } from "react";
import { readFile } from "xlsx";
import BubbleChart from "../../../components/ceds/BubbleChart";
import BarChart from "../../../components/ceds/BarChart";
import Stats from "../../../components/ceds/Stats";
import regionsMap from "../../../configs/regionsMap";

const WorkForceAnalysis = () => {
  const [geography, setGeography] = useState("ATL");
  const [activeChart, setActiveChart] = useState("total");
  const [workbook, setWorkBook] = useState();

  useEffect(() => {
    (async () => {
      var url = "https://dvrpc.org/economic/ceds/regions.xlsx";
      var file = await (await fetch(url)).arrayBuffer();
      setWorkBook(readFile(file));
    })();
  }, [setWorkBook]);

  return (
    <>
      <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
        <h1 className="mt-1 mb-2 max-w-[80ch] px-4 text-4xl font-bold text-[#662d91] print:max-w-full print:p-0 md:col-span-2 md:col-start-2 md:p-0">
          Automation and Telework: Comparing Regional Economies
        </h1>
        <p className="mb-4 text-[1.5rem] leading-[2rem]">
          Digitally-enabled telework and automation have significant
          implications for the future of the workforce, and the region's
          economy. Since telework capacity and automation risk differ from one
          industry to the next, it is important to understand the composition of
          Greater Philadelphia's industry mix in order to anticipate the future
          impacts of these forces.
        </p>
        <h2 className="text-[1.5rem] font-bold leading-[2rem] text-[#2b1956]">
          Identifying High Performance Industries
        </h2>
        <p className="mb-6">
          In the bubble chart below, toggle between peer regions to understand
          how Greater Philadelphia’s industry mix, in terms of total employment
          within each industry, differs from one region to the next. This chart
          can be used to determine which industries are of particular importance
          to the overall health of the regional economy, and considered to be a
          High Performance Industry (HPI) for that region. For the purposes of
          this analysis, HPIs are those industries for which the location
          quotient (LQ) is 1.25 or higher.
        </p>
        <div className="mb-2 flex items-center text-lg font-bold">
          <h3>Greater Philadelphia</h3>
          <h3 className="mx-1">vs.</h3>
          <select
            id="geography"
            autoComplete="off"
            onChange={(e) => setGeography(e.target.value)}
            value={geography}
          >
            {workbook &&
              workbook.SheetNames.slice(2, -2).map((name) => (
                <option key={name} value={name}>
                  {regionsMap[name]}
                </option>
              ))}
          </select>
          <span className="ml-10 mr-1 rounded-full border-2 border-[grey] p-2" />
          <h3 className="mr-4 text-sm text-[grey]">Greater Philadelphia</h3>
          <span className="mr-1 rounded-full bg-[grey] p-2" />
          <h3 className="text-sm text-[grey]">Peer Region</h3>
        </div>

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
      <div
        className="pt-10"
        style={{
          background: "linear-gradient(#0000001A, transparent)",
        }}
      >
        <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
          <h2 className="text-[1.5rem] font-bold leading-[2rem] text-[#2b1956] ">
            Planning for Automation Risk and Telework Capacity
          </h2>
          <p className="my-2">
            Regions reliant on HPIs with higher telework capacity may need to
            adopt policies aimed at talent retention and quality of life
            improvements to offset the potentially negative impacts of remote
            work. Conversely, region’s where automation risk is higher among
            HPIs may face increased challenges related to the reskilling and
            upskilling of a displaced workforce.
          </p>
          <p className="my-2">
            Toggle between the bar charts below to compare Greater
            Philadelphia’s economy, in terms of employment, automation risk, and
            telework capacity within each HPI, to that of the nine peer regions.
          </p>
          <select
            id="chart-toggle"
            autoComplete="off"
            onChange={(e) => setActiveChart(e.target.value)}
            defaultValue={"total"}
            className="my-4 font-bold"
          >
            <option value="total">Total</option>
            <option value="automation">Automation</option>
            <option value="telework">Telework</option>
          </select>

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
    </>
  );
};

export default WorkForceAnalysis;
