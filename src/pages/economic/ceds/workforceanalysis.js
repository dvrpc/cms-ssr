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
      <div>
        <h3>Greater Philadelphia</h3>
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
      </div>

      {workbook && (
        <>
          <div className="chart-container">
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
    </>
  );
};

export default WorkForceAnalysis;
