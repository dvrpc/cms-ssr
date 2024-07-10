import React from "react";
import { utils } from "xlsx";
import regionsMap from "../../configs/regionsMap";

const Stats = ({ workbook, geography, activeChart }) => {
  const scoreHex = {
    low: "#662d91",
    medium: "#F7941D",
    high: "#ED5565",
  };
  var worksheet = workbook.Sheets["summary"];
  var raw_data = utils.sheet_to_json(worksheet, { header: 1 });
  raw_data = raw_data.slice(1);
  var regionTotal = raw_data
    .filter((row) => row[0] === "Greater Philadelphia")[0][1]
    .toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  const geoWorksheet = workbook.Sheets[geography];
  var geoSectors = utils.sheet_to_json(geoWorksheet, { header: 1 });
  const geoTotal = geoSectors[21][4];
  geoSectors = geoSectors.filter((row) => row[6] === "competitive");
  const geoTotalPercent = raw_data
    .filter((row) => row[0] === regionsMap[geography])[0][1]
    .toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  const dvrpcWorksheet = workbook.Sheets["dvrpc"];
  var dvrpcSectors = utils.sheet_to_json(dvrpcWorksheet, { header: 1 });
  const dvrpcTotalPercent = dvrpcSectors[21][4];
  dvrpcSectors = dvrpcSectors.filter((row) => row[6] === "competitive");

  return (
    <>
      <div className="flex divide-x">
        <div>
          <h2>Greater Philadelphia</h2>
          <h2 className="m-0 mr-[0.5rem] inline text-[2.5rem] text-[#2b1956]">
            {regionTotal}
          </h2>
          <span>
            {activeChart === "total" && (
              <>
                of regional employment is in <span>{dvrpcSectors.length}</span>{" "}
                competitive sectors.
              </>
            )}
            {activeChart === "automation" && (
              <>of competitive employment is at low risk of automation.</>
            )}
            {activeChart === "telework" && (
              <>of competitive employment has low telework capacity.</>
            )}
          </span>
          <p className="underline">
            {activeChart === "total" && (
              <>Share of Regional Employment by Competitive Sector</>
            )}
            {activeChart === "automation" && (
              <>Automation Risk by Competitive Sector</>
            )}
            {activeChart === "telework" && (
              <>Telework Capacity by Competitive Sector</>
            )}
          </p>
          <div>
            {activeChart === "total" &&
              dvrpcSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold text-[#662d91]">
                    {(row[4] / dvrpcTotalPercent).toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
            {activeChart === "automation" &&
              dvrpcSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold" style={{ color: scoreHex[row[8]] }}>
                    {row[2].toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
            {activeChart === "telework" &&
              dvrpcSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold" style={{ color: scoreHex[row[9]] }}>
                    {row[3].toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
          </div>
        </div>
        <div>
          <h2>{regionsMap[geography]}</h2>
          <h2 className="m-0 mr-[0.5rem] inline text-[2.5rem] text-[#2b1956]">
            {geoTotalPercent}
          </h2>
          <span>
            {activeChart === "total" && (
              <>
                of regional employment is in <span>{geoSectors.length}</span>{" "}
                competitive sectors.
              </>
            )}
            {activeChart === "automation" && (
              <>of competitive employment is at low risk of automation.</>
            )}
            {activeChart === "telework" && (
              <>of competitive employment has low telework capacity.</>
            )}
          </span>
          <p className="underline">
            {activeChart === "total" && (
              <>Share of Regional Employment by Competitive Sector</>
            )}
            {activeChart === "automation" && (
              <>Automation Risk by Competitive Sector</>
            )}
            {activeChart === "telework" && (
              <>Telework Capacity by Competitive Sector</>
            )}
          </p>
          <div>
            {activeChart === "total" &&
              dvrpcSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold text-[#662d91]">
                    {(row[4] / geoTotal).toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
            {activeChart === "automation" &&
              geoSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold" style={{ color: scoreHex[row[8]] }}>
                    {row[2].toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
            {activeChart === "telework" &&
              geoSectors.map((row) => (
                <div className="flex">
                  <h2 className="font-bold" style={{ color: scoreHex[row[9]] }}>
                    {row[3].toLocaleString(undefined, {
                      style: "percent",
                      minimumFractionDigits: 1,
                    })}
                  </h2>
                  <h4>{row[1]}</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
