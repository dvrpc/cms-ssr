import React from "react";
import { Chart } from "chart.js/auto";

const BarChart = ({ workbook, geography, activeChart }) => {
  return (
    <>
      {activeChart === "total" && (
        <div class="total chart">
          <h3>Competitive Sector Employment Share of Total Employment</h3>
          <div class="chart-container">
            <canvas id="total-chart"></canvas>
          </div>
        </div>
      )}
      {activeChart === "automation" && (
        <div class="automation chart">
          <h3>Competitive Sector Employment by Automation Risk</h3>
          <div class="chart-container">
            <canvas id="automation-chart"></canvas>
          </div>
        </div>
      )}
      {activeChart === "automation" && (
        <div class="telework chart">
          <h3>Competitive Sector Employment by Telework Capacity</h3>
          <div class="chart-container">
            <canvas id="telework-chart"></canvas>
          </div>
        </div>
      )}
    </>
  );
};

export default BarChart;
