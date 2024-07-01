import React from "react";
import "./styles.css";

const WorkForceAnalysis = () => {
  return (
    <>
      <h2>
        Workforce Implications of Increased Digitalization in Regional Economies
      </h2>
      <p>
        Digital technologies have the capacity to alter where and how we work,
        and produce and distribute goods and services. Digitally-enabled
        telework and automation, and the degree to which they are adopted,
        differ from one industry to the next. Regional economies built upon
        sectors with higher Telework Capacity will need to adopt policies aimed
        at talent retention and quality of life improvements. Conversely,
        region’s where economies are more reliant on sectors with greater
        Automation Risk will more likely face challenges related to the
        reskilling and upskilling of a displaced workforce.
      </p>
      <p>
        Toggle through the charts below to better understand how Greater
        Philadelphia's economy compares to nine peer region’s from across the
        United States in terms of employment, Automation Risk, and Telework
        Capacity at the sector-level.
      </p>

      <select
        id="geography"
        // style="margin-left: calc(50vw + 3rem);"
        autocomplete="off"
      ></select>
      <div
      //   style="position: relative; max-width: 100vw; display: flex"
      >
        <h3
        // style="width: 50vw; padding-left: 3rem;"
        >
          Greater Philadelphia
        </h3>
        <h3
          //   style="width: 50vw; padding-left: 3rem;"
          class="geography-header"
        ></h3>
      </div>

      <div
        class="chart-container"
        // style="position: relative; height: 50vh; max-width: 49.5vw; display: flex"
      >
        <canvas id="bubble-dvrpc"></canvas>
        <canvas id="bubble"></canvas>
      </div>

      <div>
        <div
        // style="display: flex; width: 100%;"
        >
          <div
          //   style="width: 50vw; margin-top: 1.35rem;"
          >
            <h3>Greater Philadelphia</h3>
            <div class="total chart visible">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="region-total"></h2>
                <span>
                  of regional employment is in{" "}
                  <span id="region-comp-length"></span> competitive sectors.
                </span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Share of Regional Employment by Competitive Sector
              </p>
              <div id="region-sectors"></div>
            </div>
            <div class="automation chart">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="region-total-automation"></h2>
                <span>
                  of competitive employment is at low risk of automation
                </span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Automation Risk by Competitive Sector
              </p>
              <div id="region-automation-sectors"></div>
            </div>
            <div class="telework chart">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="region-total-telework"></h2>
                <span>of competitive employment has low telework capacity</span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Telework Capacity by Competitive Sector
              </p>
              <div id="region-telework-sectors"></div>
            </div>
          </div>

          <div
          //   style="width: 75vw; height: 50vh; margin-left: 1rem; margin-right: 1rem;"
          >
            <select id="chart-toggle" autocomplete="off">
              <option value="total" selected>
                Total
              </option>
              <option value="automation">Automation</option>
              <option value="telework">Telework</option>
            </select>
            <div class="total chart visible">
              <h3>Competitive Sector Employment Share of Total Employment</h3>
              <div
                class="chart-container"
                // style="position: relative; height: 50vh; display: flex;"
              >
                <canvas id="total-chart"></canvas>
              </div>
            </div>
            <div class="automation chart">
              <h3>Competitive Sector Employment by Automation Risk</h3>
              <div
                class="chart-container"
                // style="position: relative; height: 50vh; display: flex;"
              >
                <canvas id="automation-chart"></canvas>
              </div>
            </div>
            <div class="telework chart">
              <h3>Competitive Sector Employment by Telework Capacity</h3>
              <div
                class="chart-container"
                // style="position: relative; height: 50vh;  display: flex;"
              >
                <canvas id="telework-chart"></canvas>
              </div>
            </div>
          </div>
          <div
          //   style="width: 50vw; margin-top: 1.35rem;"
          >
            <h3 class="geography-header"></h3>
            <div class="total chart visible">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="geography-total"></h2>
                <span>
                  of regional employment is in{" "}
                  <span id="geo-comp-length"></span> competitive sectors.
                </span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Share of Regional Employment by Competitive Sector
              </p>
              <div id="geography-sectors"></div>
            </div>
            <div class="automation chart">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="geography-total-automation"></h2>
                <span>
                  of competitive employment is at low risk of automation
                </span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Automation Risk by Competitive Sector
              </p>
              <div id="geography-automation-sectors"></div>
            </div>
            <div class="telework chart">
              <span
              //   style="display: flex; align-items: center;"
              >
                <h2 id="geography-total-telework"></h2>
                <span>of competitive employment has low telework capacity</span>
              </span>
              <p
              //   style="text-decoration: underline;"
              >
                Telework Capacity by Competitive Sector
              </p>
              <div id="geography-telework-sectors"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkForceAnalysis;
