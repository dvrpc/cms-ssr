import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { generateBodyText, getOrCreateTooltip } from "./Tooltip";
import regionsMap from "../../configs/regionsMap";

const BubbleChart = ({ workbook, geography }) => {
  const dvrpcWorksheet = workbook["dvrpc"];
  const worksheet = workbook[geography];

  var colors = {
    51: "#989A9B99",
    61: "#4B743699",
    54: "#6E895899",
    55: "#326CA899",
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
          borderWidth: 1.5,
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
              enabled: false,
              padding: 12,
              external: function (context) {
                const { chart, tooltip } = context;
                const tooltipEl = getOrCreateTooltip(chart);

                if (tooltip.opacity === 0) {
                  tooltipEl.style.opacity = 0;
                  return;
                }

                const data = { raw: worksheet, dvrpc: dvrpcWorksheet };
                const items = tooltip.dataPoints.map((item) => {
                  const { dataIndex, dataset } = item;
                  const row = data[dataset.set].filter(
                    (row) => row["Sector"] === dataset.labels[dataIndex]
                  )[0];
                  const geo =
                    dataset.set === "dvrpc"
                      ? "Greater Philadelphia"
                      : regionsMap[geography];
                  const keys = Object.keys(row);
                  let { naics, automation_weight, telework_score, Sector } =
                    row;
                  const total = row[keys[4]].toLocaleString();
                  const lq = row[keys[5]];
                  automation_weight = row["automation_weight"].toLocaleString(
                    undefined,
                    {
                      style: "percent",
                      minimumFractionDigits: 1,
                    }
                  );
                  telework_score = row["telework_score"].toLocaleString(
                    undefined,
                    {
                      style: "percent",
                      minimumFractionDigits: 1,
                    }
                  );

                  return [
                    item.element.options,
                    geo,
                    Sector,
                    total,
                    lq,
                    naics,
                    automation_weight,
                    telework_score,
                  ];
                });

                // Set Text
                if (tooltip.body) {
                  const tableRoot = tooltipEl.querySelector("table");
                  // Remove old children
                  while (tableRoot.firstChild) {
                    tableRoot.firstChild.remove();
                  }
                  items.map((fields) =>
                    generateBodyText(fields, tableRoot, tooltip)
                  );
                }

                const { offsetLeft: positionX, offsetTop: positionY } =
                  chart.canvas;

                // Display, position, and set styles for font
                tooltipEl.style.opacity = 1;
                tooltipEl.style.left = positionX + tooltip.caretX + "px";
                tooltipEl.style.top = positionY + tooltip.caretY + "px";
                tooltipEl.style.font = tooltip.options.bodyFont.string;
                tooltipEl.style.padding =
                  tooltip.options.padding +
                  "px " +
                  tooltip.options.padding +
                  "px";
              },
            },
          },
          backgroundColor: function (context) {
            return colors[context.raw.category];
          },
          borderColor: function (context) {
            if (context.dataset.set === "dvrpc")
              return colors[context.raw.category]
                ? colors[context.raw.category].substring(
                    0,
                    colors[context.raw.category].length - 2
                  )
                : null;
            else return "transparent";
          },
        },
      });
    }
  }, [geography, chartRef]);

  return <canvas ref={chartRef} id="bubble"></canvas>;
};

export default BubbleChart;
