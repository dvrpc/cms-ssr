import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import regionsMap from "../../configs/regionsMap";

const BarChart = ({ workbook, geography, activeChart }) => {
  const raw_data = workbook["summary"];

  const totalOptions = {
    type: "bar",
    data: {
      labels: raw_data.map((row) => row["Region"]),
      datasets: [
        {
          data: raw_data.map((row) => row["Competitive Employment"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#662D91"
              : "#662D9170";
          },
          label: "Percentage of Employment in HPIs",
        },
      ],
    },
    options: {
      animation: false,
      maintainAspectRatio: false,
      layout: {
        autoPadding: false,
      },
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            callback: function (value, index, ticks) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          align: "end",
          labels: {
            font: {
              size: 16,
              weight: "bold",
              family: "Roboto",
            },
          },
        },
        autocolors: {
          mode: "label",
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              var row = raw_data.filter(
                (row) => row["Region"] === context.label
              )[0];
              var val = `Competitive Employment: ${row[
                "Competitive Employment"
              ].toLocaleString(undefined, {
                style: "percent",
                minimumFractionDigits: 1,
              })}`;
              return [val];
            },
          },
        },
      },
    },
    plugins: [
      {
        beforeInit: function (chart, args, options) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 15;
          };
        },
      },
    ],
  };

  const automationOptions = {
    type: "bar",
    data: {
      labels: raw_data.map((row) => row["Region"]),
      datasets: [
        {
          label: "High Automation",
          data: raw_data.map((row) => row["High Automation"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#ed5537"
              : "#ed553770";
          },
        },
        {
          label: "Medium Automation",
          data: raw_data.map((row) => row["Medium Automation"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#F7941D"
              : "#F7941D70";
          },
        },
        {
          label: "Low Automation",
          data: raw_data.map((row) => row["Low Automation"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#2B1956"
              : "#2B195670";
          },
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true,
          align: "end",
          labels: {
            font: {
              size: 16,
              weight: "bold",
              family: "Roboto",
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = (context.raw / 100).toLocaleString("en-GB", {
                style: "percent",
                minimumFractionDigits: 1,
              });
              return `${context.dataset.label}: ${value}`;
            },
          },
        },
      },
      tooltips: {
        enabled: true,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          min: 0,
          max: 100,
          stacked: true,
          ticks: {
            callback: function (value, index, ticks) {
              return value + "%";
            },
          },
        },
      },
      maintainAspectRatio: false,
      layout: {
        autoPadding: false,
      },
    },
    plugins: [
      {
        beforeInit: function (chart, args, options) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 15;
          };
        },
      },
    ],
  };
  const teleworkOptions = {
    type: "bar",
    data: {
      labels: raw_data.map((row) => row["Region"]),
      datasets: [
        {
          label: "High Telework",
          data: raw_data.map((row) => row["High Telework"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#ed5537"
              : "#ed553770";
          },
        },
        {
          label: "Medium Telework",
          data: raw_data.map((row) => row["Medium Telework"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#F7941D"
              : "#F7941D70";
          },
        },
        {
          label: "Low Telework",
          data: raw_data.map((row) => row["Low Telework"] * 100),
          backgroundColor: function (context) {
            return regionsMap[Object.keys(regionsMap)[context.dataIndex]] ===
              regionsMap[geography] || context.dataIndex === 0
              ? "#2B1956"
              : "#2B195670";
          },
        },
      ],
    },
    options: {
      animation: false,
      plugins: {
        legend: {
          display: true,
          align: "end",
          labels: {
            font: {
              size: 16,
              weight: "bold",
              family: "Roboto",
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const value = (context.raw / 100).toLocaleString("en-GB", {
                style: "percent",
                minimumFractionDigits: 1,
              });
              return `${context.dataset.label}: ${value}`;
            },
          },
        },
      },
      tooltips: {
        enabled: true,
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          min: 0,
          max: 100,
          stacked: true,
          ticks: {
            callback: function (value, index, ticks) {
              return value + "%";
            },
          },
        },
      },
      maintainAspectRatio: false,
      layout: {
        autoPadding: false,
      },
    },
    plugins: [
      {
        beforeInit: function (chart, args, options) {
          const originalFit = chart.legend.fit;
          chart.legend.fit = function fit() {
            originalFit.bind(chart.legend)();
            this.height += 15;
          };
        },
      },
    ],
  };

  const totalRef = useRef();
  const automationRef = useRef();
  const teleworkRef = useRef();
  const activeChartRefs = {
    total: { ref: totalRef, options: totalOptions },
    automation: { ref: automationRef, options: automationOptions },
    telework: { ref: teleworkRef, options: teleworkOptions },
  };

  useEffect(() => {
    if (
      activeChartRefs[activeChart] &&
      activeChartRefs[activeChart].ref.current
    ) {
      if (Chart.getChart(activeChart)) Chart.getChart(activeChart).destroy();
      new Chart(
        activeChartRefs[activeChart].ref.current,
        activeChartRefs[activeChart].options
      );
    }
  }, [
    geography,
    activeChart,
    activeChartRefs,
    totalRef,
    automationRef,
    teleworkRef,
  ]);

  return (
    <>
      {activeChart === "total" && (
        <>
          <div class="total chart h-full">
            <h3 className="text-lg font-bold min-[1280px]:absolute">
              HPI Employment Share of Total Employment
            </h3>
            <div class="chart-container h-full">
              <canvas ref={totalRef} id="total"></canvas>
            </div>
            <p className="text-sm italic text-[#666666]">
              US Bureau of Labor Statistics. Occupational Requirements Survey.
              2023; US Bureau of Labor Statistics. Occupational and Employment
              Wage Statistics. 2022; and US Census Bureau. North American
              Industry Classification System. 2022.
            </p>
          </div>
        </>
      )}
      {activeChart === "automation" && (
        <div class="automation chart h-full ">
          <h3 className="text-lg font-bold min-[1280px]:absolute">
            HPI Employment by Automation Risk
          </h3>
          <div class="chart-container mt-4 h-full">
            <canvas ref={automationRef} id="automation"></canvas>
          </div>
          <p className="text-sm italic text-[#666666]">
            Carl Benedict Frey and Michael Osborne. “The Future of Employment:
            How susceptible are jobs to computerisation?” Oxford Martin School.
            September 2013; US Bureau of Labor Statistics. Occupational and
            Employment Wage Statistics. 2022; and US Census Bureau. North
            American Industry Classification System. 2022.
          </p>
        </div>
      )}
      {activeChart === "telework" && (
        <div class="telework chart h-full">
          <h3 className="text-lg font-bold min-[1280px]:absolute">
            HPI Employment by Telework Capacity
          </h3>
          <div class="chart-container mt-4 h-full">
            <canvas ref={teleworkRef} id="telework"></canvas>
          </div>
          <p className="text-sm italic text-[#666666]">
            US Bureau of Labor Statistics. Occupational Requirements Survey.
            2023; US Bureau of Labor Statistics. Occupational and Employment
            Wage Statistics. 2022; and US Census Bureau. North American Industry
            Classification System. 2022.
          </p>
        </div>
      )}
    </>
  );
};

export default BarChart;
