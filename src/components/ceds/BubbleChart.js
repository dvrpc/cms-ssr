import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { utils } from "xlsx";

const BubbleChart = ({ workbook, geography }) => {
  const dvrpcWorksheet = workbook.Sheets["dvrpc"];
  var dvrpc_data = utils.sheet_to_json(dvrpcWorksheet, { header: 1 });
  dvrpc_data = dvrpc_data.filter((row) => parseInt(row[4])).slice(0, -2);

  const worksheet = workbook.Sheets[geography];
  var raw_data = utils.sheet_to_json(worksheet, { header: 1 });
  raw_data = raw_data.filter((row) => parseInt(row[4]));

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
      var maxRadius = Math.max(...dvrpc_data.map((row) => row[4]));
      new Chart(chartRef.current, {
        type: "bubble",
        data: {
          labels: dvrpc_data.map((row) => row[1]),
          datasets: [
            {
              labels: dvrpc_data.map((row) => row[1]),
              data: dvrpc_data.map((row) => ({
                x: (row[2] * 100).toFixed(1),
                y: (row[3] * 100).toFixed(1),
                r: Math.round((row[4] / maxRadius) * 55),
                category: row[0],
              })),
              backgroundColor: "transparent",
              set: "dvrpc",
            },
            {
              labels: raw_data.map((row) => row[1]),
              data: raw_data.map((row) => ({
                x: (row[2] * 100).toFixed(1),
                y: (row[3] * 100).toFixed(1),
                r: Math.round((row[4] / maxRadius) * 55),
                category: row[0],
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
                  const data =
                    context.dataset.set === "dvrpc" ? dvrpc_data : raw_data;
                  const row = data.filter(
                    (row) =>
                      row[1] === context.dataset.labels[context.dataIndex]
                  )[0];
                  const total = `Employment: ${row[4].toLocaleString()}`;
                  const lq = `LQ: ${row[5]}`;
                  const naics = `NAICS Code: ${row[0]}`;
                  const automation = `Automation Weight: ${row[2].toLocaleString(
                    undefined,
                    { style: "percent", minimumFractionDigits: 1 }
                  )}`;
                  const telework = `Telework Score: ${row[3].toLocaleString(
                    undefined,
                    { style: "percent", minimumFractionDigits: 1 }
                  )}`;
                  return [total, lq, naics, automation, telework];
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
