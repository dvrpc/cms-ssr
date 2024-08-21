import React from "react";
import regionsMap from "../../configs/regionsMap";

const Stats = ({ workbook, geography, activeChart }) => {
  const worksheet = workbook["summary"];
  const scoreHex = {
    low: "#662d91",
    medium: "#F7941D",
    high: "#ED5537",
  };
  const activeChartStat = {
    total: "Competitive Employment",
    automation: "Low Automation",
    telework: "Low Telework",
  };

  const geoWorksheet = workbook[geography];
  const geoTotal = geoWorksheet[19][geography];
  const geoSectors = geoWorksheet.filter(
    (row) => row["comp"] === "competitive"
  );
  const geoTotalPercent = worksheet
    .filter((row) => row["Region"] === regionsMap[geography])[0]
    [activeChartStat[activeChart]].toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  const dvrpcWorksheet = workbook["dvrpc"];
  const dvrpcTotal = dvrpcWorksheet[19]["DVRPC"];
  const dvrpcSectors = dvrpcWorksheet.filter(
    (row) => row["comp"] === "competitive"
  );
  const dvrpcTotalPercent = worksheet
    .filter((row) => row["Region"] === "Greater Philadelphia")[0]
    [activeChartStat[activeChart]].toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
    });

  return (
    <div className="mb-8 flex gap-10 md:w-[80%] min-[1535px]:w-[65%]">
      <div className="min-w-[48%] border-r border-[#707070]">
        <h2 className="text-lg font-bold">Greater Philadelphia</h2>
        <div className="flex flex-col md:w-4/5 min-[1280px]:flex-row min-[1280px]:items-center">
          <h2 className="m-0 mr-4 inline text-[2.5rem] font-bold text-[#2b1956]">
            {dvrpcTotalPercent}
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
                  {(row["DVRPC"] / dvrpcTotal).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
          {activeChart === "automation" &&
            dvrpcSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row["aut"]] }}
                >
                  {row["automation_weight"].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
          {activeChart === "telework" &&
            dvrpcSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row["tel"]] }}
                >
                  {row["telework_score"].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
        </div>
      </div>
      <div>
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
            geoSectors.map((row) => (
              <>
                <h2 className="text-lg font-bold text-[#662d91]">
                  {(row[geography] / geoTotal).toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
          {activeChart === "automation" &&
            geoSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row["aut"]] }}
                >
                  {row["automation_weight"].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
          {activeChart === "telework" &&
            geoSectors.map((row) => (
              <>
                <h2
                  className="text-lg font-bold"
                  style={{ color: scoreHex[row["tel"]] }}
                >
                  {row["telework_score"].toLocaleString(undefined, {
                    style: "percent",
                    minimumFractionDigits: 1,
                  })}
                </h2>
                <h4 className="col-span-7 my-auto min-[1280px]:ml-2">
                  {row["Sector"]}
                </h4>
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
