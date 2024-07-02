import React from "react";
import { Chart } from "chart.js/auto";
import { utils } from "xlsx";

const BubbleChart = ({ workbook, geography }) => {
  if (Chart.getChart("bubble")) Chart.getChart("bubble").destroy();

  var dvrpcWorksheet = workbook.Sheets["dvrpc"];
  var dvrpc_data = utils.sheet_to_json(dvrpcWorksheet, { header: 1 });
  dvrpc_data = dvrpc_data.filter((row) => parseInt(row[4])).slice(0, -2);
  var worksheet = workbook.Sheets[geography];
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
    42: "#A8449999",
    81: "#66318C99",
    71: "#6566AE99",
    23: "#454DA199",
    48: "#D11F4599",
    44: "#D21C8B99",
    72: "#AA272599",
  };

  var maxRadius = Math.max(...dvrpc_data.map((row) => row[4]));
  new Chart("bubble", {
    type: "bubble",
    data: {
      labels: dvrpc_data.map((row) => row[1]),
      datasets: [
        {
          label: "null",
          data: dvrpc_data.map((row) => ({
            x: (row[2] * 100).toFixed(1),
            y: (row[3] * 100).toFixed(1),
            r: Math.round((row[4] / maxRadius) * 55),
            category: row[0],
          })),
          backgroundColor: "transparent",
          borderColor: "grey",
          borderDash: [10],
        },
        {
          label: "null",
          data: raw_data.map((row) => ({
            x: (row[2] * 100).toFixed(1),
            y: (row[3] * 100).toFixed(1),
            r: Math.round((row[4] / maxRadius) * 55),
            category: row[0],
          })),
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
              const row = dvrpc_data.filter(
                (row) => row[1] === context.label
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
    },
  });
  return <canvas id="bubble"></canvas>;
};

export default BubbleChart;
