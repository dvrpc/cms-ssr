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
    <div className="container mx-auto px-8 md:grid-cols-[auto_1fr]">
      <div className="ml-[1.4rem] mb-2 flex items-center font-bold">
        <h3>Greater Philadelphia</h3>
        <h3 className="mx-2">vs.</h3>
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
          <div className="chart-container h-[60vh]">
            <BubbleChart
              workbook={workbook}
              geography={geography}
            ></BubbleChart>
          </div>
        </>
      )}
      <select
        id="chart-toggle"
        autoComplete="off"
        onChange={(e) => setActiveChart(e.target.value)}
        defaultValue={"total"}
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
          <BarChart
            workbook={workbook}
            geography={geography}
            activeChart={activeChart}
          ></BarChart>
        </>
      )}
    </div>
  );
};

export default WorkForceAnalysis;
