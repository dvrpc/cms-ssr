import React, { useEffect, useState } from "react";
import { readFile } from "xlsx";
import BubbleChart from "../../../components/ceds/BubbleChart";
import BarChart from "../../../components/ceds/BarChart";

const WorkForceAnalysis = () => {
  const [geography, setGeography] = useState("ATL");
  const [activeChart, setActiveChart] = useState("total");
  const [workbook, setWorkBook] = useState(null);
  const regionsMap = {
    undefined: "Greater Philadelphia",
    ATL: "Atlanta",
    BAL: "Baltimore",
    BOS: "Boston",
    CHI: "Chicago",
    DAL: "Dallas",
    LAX: "Los Angeles",
    NYC: "New York",
    PIT: "Pittsburgh",
    WAS: "Washington",
  };

  useEffect(() => {
    const fetchData = async () => {
      var url = "https://dvrpc.github.io/cms-embedded-items/ceds/regions.xlsx";
      var file = await (await fetch(url)).arrayBuffer();
      setWorkBook(readFile(file));
    };
    fetchData().catch(console.error);
  }, [workbook, setWorkBook]);

  return (
    <>
      <div>
        <h3>Greater Philadelphia</h3>
        <select
          id="geography"
          autoComplete="false"
          onChange={(e) => setGeography(e.target.value)}
          value={geography}
        >
          {workbook &&
            workbook.SheetNames.slice(2, -2).map((name) => (
              <option value={name}>{regionsMap[name]}</option>
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
        autocomplete="off"
        onChange={(e) => setActiveChart(e.target.value)}
      >
        <option value="total" selected>
          Total
        </option>
        <option value="automation">Automation</option>
        <option value="telework">Telework</option>
      </select>

      {workbook && <BarChart></BarChart>}
    </>
  );
};

export default WorkForceAnalysis;
