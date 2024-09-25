import React from "react";
import { graphql } from "gatsby";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Link from "../components/Link";

import StaffContact from "../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../components/HeadTemplate";
import bgImage from "../images/mcvs_banner.jpg";
ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const title = "Municipal Snapshot";

const chartDataountyFloods = { "Bucks County": 152, "Delaware County": 219 };

const FloodEventsChart = ({ floodChartData }) => {
  const chartData = {
    labels: floodChartData.map((node) => node.year),
    datasets: [
      {
        label: "Flood Events",
        data: floodChartData.map((node) => node.count),
        fill: false,
        backgroundColor: "#00796B",
        borderColor: "#00796B",
        pointBackgroundColor: "#00796B",
        pointBorderColor: "#00796B",
        pointHoverBackgroundColor: "#00796B",
        pointHoverBorderColor: "#00796B",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Flood Events",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

const SviTable = ({ data }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr
          className="text-center"
          style={{ backgroundColor: "#1C617A", color: "white" }}
        >
          <th style={{ padding: "8px" }}>Tract #</th>
          <th className="text-center" style={{ padding: "8px" }}>
            SVI (statewide) <br />
            Scale of 0–1
          </th>
          <th className="text-center" style={{ padding: "8px" }}>
            National Risk Index <br />
            Scale of 0–100
          </th>
          <th className="text-center" style={{ padding: "8px" }}>
            IPD Scale <br />
            of 0–36
          </th>
          <th className="text-center" style={{ padding: "8px" }}>
            PADEP EJ Area <br />
            Yes or No
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
            <td style={{ padding: "8px" }}>
              {row.tract_geoid.toString().slice(-6)}
            </td>
            <td className="text-center" style={{ padding: "8px" }}>
              {row.RPL_THEMES !== null
                ? `${row.RPL_THEMES.toFixed(2)} `
                : "N/A"}
            </td>
            <td className="text-center" style={{ padding: "8px" }}>
              {row.RISK_SCORE !== null
                ? `${row.RISK_SCORE.toFixed(2)} (${row.RISK_RATNG})`
                : "N/A"}
            </td>
            <td className="text-center" style={{ padding: "8px" }}>
              {row.ipd_score}
            </td>
            <td className="text-center" style={{ padding: "8px" }}>
              {row.padep_ej_area ? "Yes" : "No"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TableBuilder = ({ location, data }) => {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr style={{ backgroundColor: "#1C617A", color: "white" }}>
          <th rowSpan="2" style={{ border: "1px solid #ddd", padding: "8px" }}>
            Variable
          </th>
          <th
            colSpan="2"
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            Population
          </th>
          <th
            colSpan="4"
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            # Exposed at...
          </th>
        </tr>
        <tr style={{ backgroundColor: "#1C617A", color: "white" }}>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            Total in {location}
          </th>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            % of Total
          </th>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            2050 Sea Level Rise
          </th>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            2100 Low-Emissions Scenario
          </th>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            2100 High-Emissions Scenario
          </th>
          <th
            className="text-center"
            style={{ border: "1px solid #ddd", padding: "8px" }}
          >
            2100 High-Emissions Scenario + 1% Storm
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td style={{ padding: "8px" }}>{row.variable}</td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.population.toLocaleString()}
            </td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.percent_of_pop}
            </td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.s_2050}
            </td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.s_2100_low}
            </td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.s_2100_high}
            </td>
            <td className="text-right" style={{ padding: "8px" }}>
              {row.s_2100_1in100}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const VariableChart = ({ chartData }) => {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

const processDataForChart = (data, labels) => {
  return {
    labels: labels || data.map((item) => item.variable),
    datasets: [
      {
        label: "2050 Sea Level Rise",
        data: data.map((item) => item.s_2050),
        backgroundColor: "#78A8B7",
      },
      {
        label: "2100 Low-Emissions Scenario",
        data: data.map((item) => item.s_2100_low),
        backgroundColor: "#1C617A",
      },
      {
        label: "2100 High-Emissions Scenario",
        data: data.map((item) => item.s_2100_high),
        backgroundColor: "#357D5A",
      },
      {
        label: "2100 High-Emissions Scenario + 1% Storm",
        data: data.map((item) => item.s_2100_1in100),
        backgroundColor: "#a6d5b9",
      },
    ],
  };
};
export const filterByGeoid = (data, geoid) => {
  return data.filter((item) => item.geoid === geoid);
};

const MunicipalityPage = ({ data }) => {
  const { userUser, navItem } = data;

  const municipality = data.municipality.nodes[0];
  
  const floodEventsData = data.floods.nodes.filter(
    (item) => item.county === municipality.county
  );

  const areaCalcs = data.areaCalcs.nodes[0];

  const socialData = filterByGeoid(
    data.socialVulnerabilityData.nodes,
    municipality.geoid
  );
  const socialChart = processDataForChart(socialData);

  const householdData = filterByGeoid(
    data.householdData.nodes,
    municipality.geoid
  );
  const householdChart = processDataForChart(householdData);

  const racialData = filterByGeoid(data.racialData.nodes, municipality.geoid);
  const racialChart = processDataForChart(racialData);

  const structureTypeData = filterByGeoid(
    data.housingTypeData.nodes,
    municipality.geoid
  );
  const structureTypeChart = processDataForChart(structureTypeData);

  const sviData = filterByGeoid(data.sviData.nodes, municipality.geoid);

  return (
    <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
        <main className="main px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:p-0">
          <h1 className="text-3xl font-bold uppercase text-[#1C617A]">
            {municipality.name} |{" "}
            <span className="font-light">{municipality.county}</span>
          </h1>
          <h2 id="history" className="text-[#1C617A]">History of Flood Events</h2>
          <p>
            As shown in Figure 1, there were undefined flood events in{" "}
            {municipality.name} between 1996 and 2022. During the same time
            period, there were {chartDataountyFloods[municipality.county]} flood events countywide.
          </p>
          <figcaption className="px-0">
            Figure 1: Flood Events by Year for {municipality.county} (1996-2022)
          </figcaption>
          <FloodEventsChart floodChartData={floodEventsData} />
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#757575' }}>
            Source: NOAA National Centers for Environmental Information, Storm Event Database 2023
          </div>
          <h2 id="sealevel" className="text-[#1C617A]">
            Projected Sea Level Rise Impacts for {municipality.name}
          </h2>
          <p>
            The water levels of the tidal section of the Delaware River will
            rise as sea level rises along the Atlantic Coast. These rising water
            levels will be a permanent change to the landscape and will
            introduce new flooding vulnerabilities along the Delaware that
            communities will need to address.
          </p>
          <p>
            In Pennsylvania and New Jersey, sea level is expected to rise
            between <b>1.0 and 1.8 feet by 2050</b> (from a base year of 2000) and
            could rise between <b>2.4 and 4.5 feet by 2100</b>, under a high emissions
            scenario. However, how high sea levels ultimately rise is directly
            related to the rate at which humans continue to emit greenhouse
            gasses into the atmosphere into the future.
          </p>
          <p>
            Rising sea levels will impact communities and ecosystems in many
            ways. Both low and high tide levels will become higher, causing very
            low-lying coastal areas to be permanently flooded and areas at
            slightly higher elevations to flood twice-a-day as the tide rises
            and falls. Sea level rise (SLR) will also increase the height of
            storm surge, causing more damage to neighborhoods that have been
            affected by storm surge in the past and exposing new residential
            areas to flooding during storms.
          </p>
          <p>In {municipality.name}, approximately:</p>
          <ul>
            <li>
              {areaCalcs.ac_s2050_land} acres ({areaCalcs.per_s2050_land}%) of
              land within {municipality.name} is anticipated to be permanently
              inundated by 2050;
            </li>
            <li>
              {areaCalcs.ac_s2100_low_land} acres (
              {areaCalcs.per_s2100_low_land}%) of land within{" "}
              {municipality.name} is anticipated to be permanently inundated by
              2100 under a low emissions scenario; and
            </li>
            <li>
              {areaCalcs.ac_s2100_high_land} acres (
              {areaCalcs.per_s2100_high_land}%) of land within{" "}
              {municipality.name} is anticipated to be permanently inundated by
              2100 under a high emissions scenario.
            </li>
          </ul>
          <h2 id="populations" className="text-[#1C617A]">Affected Populations</h2>
          <p>
            Approximately {municipality.population.toLocaleString()} people live
            in {municipality.name}; however not every resident will experience
            the effects of SLR and flooding in the same way. Certain populations
            are more vulnerable to the effects of SLR because of their location,
            their socio-economic status, and their ability to prepare for, adapt
            to, and recover from flooding events. Understanding which
            populations are exposed to coastal flooding and which are most
            vulnerable can help a community to better plan for and mitigate the
            impacts of SLR.
          </p>
          <p>
            The United States Centers for Disease Control and Prevention's
            (CDC's) Agency for Toxic Substances and Disease Registry (ATSDR)
            created the Social Vulnerability Index (SVI) to rank the social
            vulnerability of communities in the United States to hazardous
            events and disasters. The SVI ranks census tracts on 16 social
            factors organized into four themes: socioeconomic status; household
            characteristics; racial and ethnic minority status; and housing type
            and transportation.{" "}
          </p>
          <p>
            The following analysis overlays four different SLR and flooding
            scenarios with SVI data to better understand who may be affected by
            coastal flooding. Because this section of the analysis is
            specifically interested in the effect on people, the analysis uses
            the proportion of urban areas that may be impacted by inland and
            coastal flood hazards to estimate the percent of each population
            group that may be impacted by flood hazards.
          </p>
          <ul>
            <li>Total Municipality Acres: {areaCalcs.land_acres}</li>
            <li>Total Urban Area (Acres): {areaCalcs.urban_acres}</li>
            <li>Urban Area Impacted by Sea Level Rise:</li>
            <ul>
              <li>
                In 2050: {areaCalcs.ac_s2050} acres ({areaCalcs.per_s2050}%)
              </li>
              <li>
                Under a Low-Emission Scenario in 2100: {areaCalcs.ac_s2100_low}{" "}
                acres ({areaCalcs.per_s2100_low}%)
              </li>
              <li>
                Under a High-Emission Scenario in 2100:{" "}
                {areaCalcs.ac_s2100_high} acres ({areaCalcs.per_s2100_high}%)
              </li>
              <li>
                Under a High-Emission Scenario in 2100 + a 1% Chance Storm:{" "}
                {areaCalcs.ac_s2100_high} acres ({areaCalcs.per_s2100_high}%)
              </li>
            </ul>
          </ul>
          <br/>
          <h3 className="text-[#2B7F93]">
            Vulnerable Population by Socio-Economic Status
          </h3>
          <VariableChart chartData={socialChart} />
          <TableBuilder location={municipality.name} data={socialData} />
          
          <br/>
          <h3 className="text-[#2B7F93]">
            Vulnerable Population by Household Characteristics
          </h3>
          <VariableChart chartData={householdChart} />
          <TableBuilder location={municipality.name} data={householdData} />
          <br/>
          <h3 className="text-[#2B7F93]">
            Vulnerable Population by Racial and Ethnic Minority
          </h3>
          <VariableChart chartData={racialChart} />
          <TableBuilder location={municipality.name} data={racialData} />
          <br/>
          <h3 className="text-[#2B7F93]">
            Vulnerable Population by Housing Type/Transportation
          </h3>
          <VariableChart chartData={structureTypeChart} />
          <TableBuilder location={municipality.name} data={structureTypeData} />
          <p>
            <em>
              *Multi-unit structures are defined here as 10 or more housing
              units in a structure. Crowding is defined here as the number of
              households that have more people than rooms. Group Quarters is
              defined as persons who are in institutionalized group quarters
              (e.g., correctional institutions, nursing homes) and
              non-institutionalized group quarters (e.g., college dormitories,
              military quarters).
            </em>
          </p>
          <h3 className="text-[#2B7F93]">Other Vulnerability Indices</h3>
          <p>
            In addition to the SVI, there are a number of other data sets and
            tools that analyze and map different facets of vulnerability. The
            chart below shows how {municipality.name}’s {sviData.length} census
            tracts compare across different platforms and different geographies.
          </p>
          <SviTable data={sviData} />
          <br/>
          <h2 id="assets" className="text-[#1C617A]">
            Affected Critical Assets and Infrastructure
          </h2>
          <p>
            Critical assets and infrastructure are the essential facilities that
            a community needs to provide services to its residents. This
            includes police and fire stations, hospitals, schools, and other
            municipal facilities. Roads and transit stations are also critical
            infrastructure that provide access to these critical facilities. The
            following analysis documents the number of critical assets and
            amount of roadway that may be inundated under the four flooding
            scenarios.
          </p>
          <p><i>Error rendering table.</i></p>
          <h2 id="property" className="text-[#1C617A]">Affected Property</h2>
          <p>
            In addition to critical facilities, many homes may have been
            inundated during past flooding events or may be inundated in the
            future under different SLR scenarios. The following section includes
            data from the Federal Emergency Management Agency on repetitive loss
            properties and on National Flood Insurance Program participation. It
            also includes an analysis of the value of properties that may be
            affected under different flooding scenarios.
          </p>
        </main>
        <div className="flex flex-col p-4 italic print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:items-end md:p-0">
          <nav className="mb-4 text-right text-lg leading-none [&_.active+ul]:text-black [&_li]:py-0.5 [&_ul_ul]:pt-1 [&_ul_ul]:text-base [&_ul_ul]:text-[#6e6e6e] [&_ul_ul_ul]:text-sm [&_ul_ul_ul_ul]:text-xs">
            <ul>
                <li><Link to="#history">History of Flood Events</Link></li>
                <li><Link to="#sealevel">Projected Sea Level Rise Impacts </Link></li>
                <li><Link to="#populations">Affected Populations</Link></li>
                <li><Link to="#assets">Affected Critical Assets and Infrastructure</Link></li>
                <li><Link to="#property">Affected Property</Link></li>

            </ul>
          </nav>
        </div>
      </div>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data }) =>
  HeadTemplate({
    title,
    summary:
      "The DVRPC Data Center centralizes access to data and applications published by DVRPC for planning purposes. Watch this space for future content and enhancements as we continue to develop this site.",
    css: `
          --color-h1: #1C617A;
          --color-h2: #1C617A;
          --color-h3: #2B7F93;
          --bg-cover-image: url(${bgImage});
          --height-banner: 25vw;
          `,
  });

export const query = graphql`
  query ($slug: String!) {
    municipality: allPaCoastalMunicipalitiesJson(
      filter: { slug: { eq: $slug } }
    ) {
      nodes {
        geoid
        name
        county
        population
      }
    }
    userUser(mail: { eq: "averbofsky@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    navItem(href: { regex: "/^/resiliency/i" }) {
      ...nestednavitem
    }
    socialVulnerabilityData: allSocialvulnerabilityJson {
      nodes {
        geoid
        variable
        population
        percent_of_pop
        s_2050
        s_2100_low
        s_2100_high
        s_2100_1in100
      }
    }
    householdData: allHouseholdJson {
      nodes {
        geoid
        variable
        population
        percent_of_pop
        s_2050
        s_2100_low
        s_2100_high
        s_2100_1in100
      }
    }
    racialData: allRacialJson {
      nodes {
        geoid
        variable
        population
        percent_of_pop
        s_2050
        s_2100_low
        s_2100_high
        s_2100_1in100
      }
    }
    housingTypeData: allStructureTypeJson {
      nodes {
        geoid
        variable
        population
        percent_of_pop
        s_2050
        s_2100_low
        s_2100_high
        s_2100_1in100
      }
    }
    sviData: allIndicesJson {
      nodes {
        geoid
        tract_geoid
        RISK_SCORE
        RISK_RATNG
        ipd_score
        RPL_THEMES
        padep_ej_area
      }
    }
    areaCalcs: allAreaJson {
      nodes {
        geoid
        ac_s2050
        per_s2050
        ac_s2100_low
        per_s2100_low
        urban_acres
        ac_s2100_high
        per_s2100_high
        ac_s2100_high_100
        per_s2100_high_100
        ac_s2050_land
        per_s2050_land
        ac_s2100_low_land
        per_s2100_low_land
        ac_s2100_high_land
        per_s2100_high_land
        land_acres
      }
    }
    floods: allFloodsJson {
      nodes {
        county
        year
        count
      }
    }
  }
`;

export default MunicipalityPage;
