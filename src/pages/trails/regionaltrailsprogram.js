import React, { useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const boundaryLayers = [
  {
    id: "municipality-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "municipalities",
    paint: {
      "line-width": 0.5,
      "line-color": "#efefef",
    },
  },
  {
    id: "county-outline",
    type: "line",
    source: "boundaries",
    "source-layer": "county",
    paint: {
      "line-width": 2.5,
      "line-color": "#fff",
    },
  },
];

const fillLayers = [
  {
    id: "county-fill",
    type: "fill",
    source: "boundaries",
    "source-layer": "county",
    layout: {},
    paint: {
      "fill-color": "#B6C1C6",
      "fill-opacity": 1,
    },
    filter: ["==", "dvrpc", "Yes"],
  },
  {
    id: "dvrpcnt",
    type: "fill",
    source: "boundaries",
    "source-layer": "county",
    layout: {},
    paint: {
      "fill-color": "#B6C1C6",
      "fill-opacity": 0.2,
    },
    filter: ["!=", "dvrpc", "Yes"],
  },
];

const RegionalTrailsPage = () => {
  const [showPopup, setShowPopup] = useState(null);
  const map = useRef();
  const maxExtent = new LngLatBounds([
    [-76.09405517578125, 39.49211914385648],
    [-74.32525634765625, 40.614734298694216],
  ]);

  const mouseEnter = () => {
    map.current.getCanvas().style.cursor = "pointer";
  };
  const mouseLeave = () => {
    map.current.getCanvas().style.cursor = "";
  };
  const click = (e) => {
    if (e.features.length) {
      const props = e.features[0].properties;
      const award = props.award.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      setShowPopup({ ...props, lngLat: e.lngLat, award });
    }
  };

  return (
    <>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css"
        rel="stylesheet"
      />
      <Body title="Regional Trails Program">
        <Map
          initialViewState={{ bounds: maxExtent }}
          mapboxAccessToken="pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA"
          ref={map}
          style={{ height: "500px", width: "100%" }}
          interactiveLayerIds={["trail-lines"]}
          onClick={click}
          onMouseEnter={mouseEnter}
          onMouseLeave={mouseLeave}
        >
          <Source
            id="county"
            type="vector"
            url="https://tiles.dvrpc.org/data/dvrpc-municipal.json"
          >
            {fillLayers.map((layer) => (
              <Layer {...layer} />
            ))}
            {boundaryLayers.map((layer) => (
              <Layer {...layer} />
            ))}
          </Source>
          <Source
            id="trails"
            type="geojson"
            data="https://arcgis.dvrpc.org/portal/rest/services/Transportation/RegionalTrailsProgram/FeatureServer/0/query?where=1=1&outfields=*&outsr=4326&f=geojson"
          >
            <Layer
              id="trail-lines"
              type="line"
              source="trails"
              paint={{ "line-color": "#82be37", "line-width": 4 }}
            />
          </Source>
          {showPopup && (
            <Popup
              latitude={showPopup.lngLat.lat}
              longitude={showPopup.lngLat.lng}
              onClose={() => setShowPopup(null)}
              closeButton={true}
              closeOnClick={true}
            >
              <div className="-mx-[10px] -mb-[15px] -mt-[10px]">
                <h1 className="text-md bg-[#82be37] p-2 text-[1.3em] font-bold text-white">
                  {showPopup.name}
                </h1>
                <ul className="my-0 list-none p-2 pt-0">
                  <li>
                    <span className="font-bold text-[#2e5983]">Award:</span>{" "}
                    {showPopup.award}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">Phase:</span>{" "}
                    {showPopup.phase}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">Type:</span>{" "}
                    {showPopup.type}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">length:</span>{" "}
                    {showPopup.length}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">Sponsor:</span>{" "}
                    {showPopup.sponsor}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">
                      Municipality:
                    </span>{" "}
                    {showPopup.municipality}
                  </li>
                  <li>
                    <span className="font-bold text-[#2e5983]">County:</span>{" "}
                    {showPopup.county}
                  </li>
                </ul>
              </div>
            </Popup>
          )}
        </Map>
      </Body>
      <StaffContact />
    </>
  );
};

export default RegionalTrailsPage;
