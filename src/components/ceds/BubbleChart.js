import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const BubbleChart = ({ workbook, geography }) => {
  const dvrpcWorksheet = workbook["dvrpc"];
  const worksheet = workbook[geography];

  var colors = {
    51: "#989A9B99",
    61: "#4B743699",
    54: "#74985F99",
    55: "#8CBC7399",
    52: "#F8952199",
    56: "#F36F3199",
    53: "#EA563799",
    62: "#27255E99",
    22: "#4D318999",
    31: "#9D83BC99",
    42: "#A75BA499",
    81: "#806FAC99",
    71: "#6566AE99",
    23: "#5D744C99",
    48: "#D11F4599",
    44: "#EBA65199",
    72: "#AA272599",
  };

  const chartRef = useRef();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (Chart.getChart("bubble")) Chart.getChart("bubble").destroy();
      var maxRadius = 515666;
      new Chart(chartRef.current, {
        type: "bubble",
        data: {
          labels: null,
          datasets: [
            {
              labels: dvrpcWorksheet.map((row) => row["Sector"]),
              data: dvrpcWorksheet.map((row) => ({
                x: (row["automation_weight"] * 100).toFixed(1),
                y: (row["telework_score"] * 100).toFixed(1),
                r: Math.round((row["DVRPC"] / maxRadius) * 55),
                category: row["naics"],
              })),
              backgroundColor: "transparent",
              set: "dvrpc",
            },
            {
              labels: worksheet.map((row) => row["Sector"]),
              data: worksheet.map((row) => ({
                x: (row["automation_weight"] * 100).toFixed(1),
                y: (row["telework_score"] * 100).toFixed(1),
                r: Math.round((row[geography] / maxRadius) * 55),
                category: row["naics"],
              })),
              set: "raw",
            },
          ],
        },
        options: {
          animation: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Automation Risk",
              },
            },
            y: {
              title: {
                display: true,
                text: "Telework Capacity",
              },
            },
          },
          maintainAspectRatio: false,
          layout: {
            autoPadding: false,
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const data = { raw: worksheet, dvrpc: dvrpcWorksheet };
                  const row = data[context.dataset.set].filter(
                    (row) =>
                      row["Sector"] ===
                      context.dataset.labels[context.dataIndex]
                  )[0];
                  const keys = Object.keys(row);
                  let { naics, automation_weight, telework_score, Sector } =
                    row;
                  const total = `Employment: ${row[keys[4].toLocaleString()]}`;
                  const lq = `LQ: ${row[keys[5]]}`;
                  naics = `NAICS Code: ${naics}`;
                  automation_weight = `Automation Weight: ${row[
                    "automation_weight"
                  ].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}`;
                  telework_score = `Telework Score: ${row[
                    "telework_score"
                  ].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}`;
                  return [
                    Sector,
                    total,
                    lq,
                    naics,
                    automation_weight,
                    telework_score,
                  ];
                },
              },
            },
          },
          backgroundColor: function (context) {
            return colors[context.raw.category];
          },
          borderColor: function (context) {
            if (context.dataset.set === "dvrpc")
              return colors[context.raw.category];
            else return "transparent";
          },
        },
      });
    }
  }, [geography, chartRef]);

  return <canvas ref={chartRef} id="bubble"></canvas>;
};

export default BubbleChart;
