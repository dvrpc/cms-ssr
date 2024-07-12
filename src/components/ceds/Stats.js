import React from "react";
import { utils } from "xlsx";
import regionsMap from "../../configs/regionsMap";

const Stats = ({ workbook, geography, activeChart }) => {
  const scoreHex = {
    low: "#662d91",
    medium: "#F7941D",
    high: "#ED5537",
  };
  const activeChartStat = { total: 1, automation: 2, telework: 5 };
  var worksheet = workbook.Sheets["summary"];
  var raw_data = utils.sheet_to_json(worksheet, { header: 1 });
  raw_data = raw_data.slice(1);
  var regionTotal = raw_data
    .filter((row) => row[0] === "Greater Philadelphia")[0]
    [activeChartStat[activeChart]].toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  const geoWorksheet = workbook.Sheets[geography];
  var geoSectors = utils.sheet_to_json(geoWorksheet, { header: 1 });
  const geoTotal = geoSectors[21][4];
  geoSectors = geoSectors.filter((row) => row[6] === "competitive");
  const geoTotalPercent = raw_data
    .filter((row) => row[0] === regionsMap[geography])[0]
    [activeChartStat[activeChart]].toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  const dvrpcWorksheet = workbook.Sheets["dvrpc"];
  var dvrpcSectors = utils.sheet_to_json(dvrpcWorksheet, { header: 1 });
  const dvrpcTotalPercent = dvrpcSectors[21][4];
  dvrpcSectors = dvrpcSectors.filter((row) => row[6] === "competitive");

  return (
    <div className="mb-8 flex gap-10 md:w-[80%] min-[1535px]:w-[65%]">
      <div className="border-r border-[#707070]">
        <h2 className="text-lg font-bold">Greater Philadelphia</h2>
        <div className="flex flex-col md:w-4/5 min-[1280px]:flex-row min-[1280px]:items-center">
          <h2 className="m-0 mr-4 inline text-[2.5rem] font-bold text-[#2b1956]">
            {regionTotal}
          </h2>
          <div className="min-[1280px]:leading-4">
            {activeChart === "total" && (
              <>
                of regional employment is in <span>{dvrpcSectors.length}</span>{" "}
                HPIs.
              </>
            )}
            {activeChart === "automation" && (
              <>of HPI employment is at low risk of automation.</>
            )}
            {activeChart === "telework" && (
              <>of HPI employment has low telework capacity.</>
            )}
          </div>
        </div>
        <p className="mb-2 font-bold">
          {activeChart === "total" && <>Share of Regional Employment by HPI</>}
          {activeChart === "automation" && <>Automation Risk by HPI</>}
          {activeChart === "telework" && <>Telework Capacity by HPI</>}
        </p>
        <div className="grid-cols-8 min-[1280px]:grid">
          {activeChart === "total" &&
            dvrpcSectors.map((row) => (
              <>
                <h2 className="text-lg font-bold text-[#662d91]">
                  {(row[4] / dvrpcTotalPercent).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row[1]}
                </h4>
              </>
            ))}
          {activeChart === "automation" &&
            dvrpcSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row[8]] }}
                >
                  {row[2].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row[1]}
                </h4>
              </>
            ))}
          {activeChart === "telework" &&
            dvrpcSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row[9]] }}
                >
                  {row[3].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto md:ml-2">{row[1]}</h4>
              </>
            ))}
        </div>
      </div>
      <div className="min-[1280px]:ml-auto">
        <h2 className="text-lg font-bold">{regionsMap[geography]}</h2>
        <div className="flex flex-col md:w-4/5 min-[1280px]:flex-row min-[1280px]:items-center">
          <h2 className="m-0 mr-4 inline text-[2.5rem] font-bold text-[#2b1956]">
            {geoTotalPercent}
          </h2>
          <div className="min-[1280px]:leading-4">
            {activeChart === "total" && (
              <>
                of regional employment is in <span>{geoSectors.length}</span>{" "}
                HPIs.
              </>
            )}
            {activeChart === "automation" && (
              <>of HPI employment is at low risk of automation.</>
            )}
            {activeChart === "telework" && (
              <>of HPI employment has low telework capacity.</>
            )}
          </div>
        </div>
        <p className="mb-2 font-bold">
          {activeChart === "total" && <>Share of Regional Employment by HPI</>}
          {activeChart === "automation" && <>Automation Risk by HPI</>}
          {activeChart === "telework" && <>Telework Capacity by HPI</>}
        </p>
        <div className="grid-cols-8 min-[1280px]:grid">
          {activeChart === "total" &&
            dvrpcSectors.map((row) => (
              <>
                <h2 className="text-lg font-bold text-[#662d91]">
                  {(row[4] / geoTotal).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row[1]}
                </h4>
              </>
            ))}
          {activeChart === "automation" &&
            geoSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row[8]] }}
                >
                  {row[2].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row[1]}
                </h4>
              </>
            ))}
          {activeChart === "telework" &&
            geoSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row[9]] }}
                >
                  {row[3].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row[1]}
                </h4>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
