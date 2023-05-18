import React from "react";
import Map, { Layer, Source } from "react-map-gl";
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
  const maxExtent = new LngLatBounds([
    [-76.13660270099047, 39.51488251559762],
    [-74.38970960698468, 40.60856713855744],
  ]);

  return (
    <>
      <Body title="Regional Trails Program">
        <Map
          initialViewState={{ bounds: maxExtent }}
          mapboxAccessToken="pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA"
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
        </Map>
      </Body>
      <StaffContact />
    </>
  );
};

export default RegionalTrailsPage;
