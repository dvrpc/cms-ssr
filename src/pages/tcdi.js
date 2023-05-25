import React, { useRef, useState } from "react";
import Body from "../components/Body";
import HtmlParser from "../components/HtmlParser";
import StaffContact from "../components/StaffContact";
import { Layer, Map, Popup, Source } from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import {
  featureSet,
  data2017,
  data2019,
  data2021,
} from "../components/TCDIData";

const boundaryLayers = [
  {
    id: "municipality-outline",
    type: "line",
    source: "counties",
    "source-layer": "municipalities",
    paint: {
      "line-width": 0.5,
      "line-color": "#efefef",
    },
  },
  {
    id: "county-outline",
    type: "line",
    source: "counties",
    "source-layer": "county",
    paint: {
      "line-width": 2.5,
      "line-color": "#fff",
    },
    filter: ["==", "dvrpc", "Yes"],
  },
];

const TCDIPage = ({ body, title, navItem, location, staffContact }) => {
  const map = useRef();
  const [showPopup, setShowPopup] = useState(null);
  const maxExtent = new LngLatBounds([
    [-76.09405517578125, 39.49211914385648],
    [-74.32525634765625, 40.614734298694216],
  ]);
  const awards = featureSet.features.map(function (project) {
    return project.properties.AMOUNT;
  });
  const maxAward = Math.max.apply(null, awards);
  const minAward = Math.min.apply(null, awards);
  const maxRadius = 25;
  const minRadius = 5;
  const sets = [
    { data: data2021, invested: 1.8, leveraged: 250 },
    { data: data2019, invested: 1.8, leveraged: 450 },
    { data: data2017, invested: 2.2, leveraged: 550 },
  ];
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumSignificantDigits: 2,
  });

  // map event handlers
  const mouseEnter = () => {
    map.current.getCanvas().style.cursor = "pointer";
  };
  const mouseLeave = () => {
    map.current.getCanvas().style.cursor = "";
  };
  const click = (e) => {
    if (e.features.length) {
      const props = e.features[0].properties;
      setShowPopup({ ...props });
    }
  };

  return (
    <>
      <Body title={title} menu={navItem}>
        <HtmlParser html={body ?? ""} />
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
          rel="stylesheet"
        />
        <div className="card">
          <h2>INVESTING IN A REGION</h2>
          <div className="flex justify-evenly text-center text-[#0e3243]">
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                308
              </p>
              <span>AWARDS</span>
            </div>
            <span className="border border-[#0e3f43]"></span>
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                $21.47
              </p>
              <span>MILLION INVESTED</span>
            </div>
            <span className="border border-[#0e3f43]"></span>
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                $250
              </p>
              <span>MILLION LEVERAGED</span>
            </div>
          </div>
        </div>
        <div className="card">
          <h2>FY 2023 Pennsylvania TCDI AWARDS</h2>
          <Map
            initialViewState={{ bounds: maxExtent }}
            style={{ height: "500px", width: "100%" }}
            mapboxAccessToken="pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA"
            interactiveLayerIds={["awards"]}
            ref={map}
            onClick={click}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
          >
            <Source
              id="boundaries"
              type="vector"
              url="https://tiles.dvrpc.org/data/dvrpc-municipal.json"
            >
              <Layer
                id="county-fill"
                type="fill"
                source="counties"
                source-layer="county"
                paint={{ "fill-color": "#B6C1C6", "fill-opacity": 1 }}
                filter={["==", "dvrpc", "Yes"]}
              />
              {boundaryLayers.map((layer) => (
                <Layer {...layer} />
              ))}
            </Source>
            <Source type="geojson" data={featureSet}>
              <Layer
                id="awards"
                type="circle"
                paint={{
                  "circle-radius": {
                    property: "AMOUNT",
                    type: "exponential",
                    stops: [
                      [minAward, minRadius],
                      [maxAward, maxRadius],
                    ],
                  },
                  "circle-color": "#6fb8b9",
                  "circle-opacity": 0.7,
                  "circle-stroke-width": 1.25,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-opacity": 0.7,
                }}
              />
            </Source>
            {showPopup && (
              <Popup
                latitude={showPopup.latitude}
                longitude={showPopup.longitude}
                onClose={() => setShowPopup(null)}
                closeOnClick={false}
              >
                <div
                  className="-mx-[10px] -mb-[15px] -mt-[10px] p-2"
                  style={{ fontSize: "1.25em" }}
                >
                  <h1 className="font-bold">{showPopup.PROJECTNAME}</h1>
                  <p className="m-0 italic">
                    Award Amount: {showPopup.amt_web}
                  </p>
                  <hr className="m-0 my-2" />
                  <p className="m-0">{showPopup.PROJ_DESC}</p>
                </div>
              </Popup>
            )}
          </Map>
          <div className="flex justify-evenly text-center text-[#0e3243]">
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                13
              </p>
              <span>PROJECTS</span>
            </div>
            <span className="border border-[#0e3f43]"></span>
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                $1.2
              </p>
              <span>MILLION INVESTED</span>
            </div>
            <span className="border border-[#0e3f43]"></span>
            <div>
              <p className="mb-0" style={{ fontSize: "3.3em" }}>
                $250
              </p>
              <span>MILLION LEVERAGED</span>
            </div>
          </div>
        </div>
        <details>
          <summary>Project details</summary>
          <div className="mb-2 flex flex-col">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th>Awardee</th>
                  <th>Project Name</th>
                  <th>Award Amount</th>
                </tr>
              </thead>
              <tbody>
                {featureSet.features.map((feature) => (
                  <tr>
                    <td>{feature.properties.MUNICIPALITY}</td>
                    <td>{feature.properties.PROJECTNAME}</td>
                    <td>{feature.properties.amt_web}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
        <div className="card">
          <h2>Previous TCDI Projects</h2>
          {sets.map((set) => {
            let year = set.data[0].YR;
            return (
              <details>
                <summary>FY {year}</summary>
                <div className="mb-2 flex flex-col">
                  <div className="my-2 flex justify-evenly text-center text-[#0e3243]">
                    <div>
                      <p className="mb-0" style={{ fontSize: "3.3em" }}>
                        {set.data.length}
                      </p>
                      <span>PROJECTS</span>
                    </div>
                    <span className="border border-[#0e3f43]"></span>
                    <div>
                      <p className="mb-0" style={{ fontSize: "3.3em" }}>
                        ${set.invested}
                      </p>
                      <span>MILLION INVESTED</span>
                    </div>
                    <span className="border border-[#0e3f43]"></span>
                    <div>
                      <p className="mb-0" style={{ fontSize: "3.3em" }}>
                        ${set.leveraged}
                      </p>
                      <span>THOUSAND LEVERAGED</span>
                    </div>
                  </div>
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th>Awardee</th>
                        <th>Project Name</th>
                        <th>Award Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {set.data.map((feature) => (
                        <tr>
                          <td>{feature.MUNICIPALITY}</td>
                          <td>{feature.PROJECTNAME}</td>
                          <td>{currencyFormatter.format(feature.AMOUNT)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            );
          })}
          <h2>
            <a href="/">Older TCDI Projects Archive</a>
          </h2>
        </div>
      </Body>
      <StaffContact
        staffContact={staffContact}
        title={title}
        location={location}
      />
    </>
  );
};

export default TCDIPage;
