import React, { useRef, useState, useCallback, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { isMatch } from "matcher";
import { themeToCustomVars } from "./HeadTemplate";
import Map, { Source, Layer, Popup } from "react-map-gl";
import { LngLatBounds } from "mapbox-gl";
import DataTable from "react-data-table-component";
import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";
import { Helmet } from "react-helmet";

const DVRPCMap = ({ features }) => {
  const mapRef = useRef();
  const maxExtent = new LngLatBounds([
    [-76.09405517578125, 39.49211914385648],
    [-74.32525634765625, 40.614734298694216],
  ]);
  const [clickedFeature, setClickedFeature] = useState(null);

  const onClick = (event) => {
    const feature = event.features[0];
    if (feature) {
      setClickedFeature({
        feature: feature,
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng,
      });
    }
  };

  return (
    <div className="h-[500px] w-full">
      <Map
        interactiveLayerIds={["trail-lines"]}
        ref={mapRef}
        initialViewState={{ bounds: maxExtent }}
        mapboxAccessToken="pk.eyJ1IjoidGhhY2hhZG9yaWFuZHZycGMiLCJhIjoiY2x6Ymw5bjNoMDIxdTJscHJlbDMxMzM1ZyJ9.AZoU09L4abDOTWEUM5Uwdw"
        minZoom={8}
        onClick={onClick}
      >
        <Source
          id="boundaries"
          type="vector"
          url="https://tiles.dvrpc.org/data/dvrpc-municipal.json"
        >
          <Layer
            id="county-fill"
            type="fill"
            source-layer="county"
            paint={{
              "fill-color": "#B6C1C6",
              "fill-opacity": 1,
            }}
            filter={["==", "dvrpc", "Yes"]}
          />
          <Layer
            id="dvrpcnt"
            type="fill"
            source-layer="county"
            paint={{
              "fill-color": "#B6C1C6",
              "fill-opacity": 0.2,
            }}
            filter={["!=", "dvrpc", "Yes"]}
          />
          <Layer
            id="municipality-outline"
            type="line"
            source-layer="municipalities"
            paint={{
              "line-width": 0.5,
              "line-color": "#efefef",
            }}
          />
          <Layer
            id="county-outline"
            type="line"
            source-layer="county"
            paint={{
              "line-width": 2.5,
              "line-color": "#fff",
            }}
          />
        </Source>

        <Source id="trails" type="geojson" data={features}>
          <Layer
            type="line"
            id="trail-lines"
            paint={{ "line-color": "#82be37", "line-width": 4 }}
          ></Layer>
        </Source>

        {clickedFeature ? (
          <Popup
            longitude={clickedFeature.longitude}
            latitude={clickedFeature.latitude}
            closeButton={true}
            closeOnClick={false}
            maxWidth="240px"
            onClose={() => setClickedFeature(null)}
          >
            <h3 className="bg-[#82be37] p-2.5 text-[1.3em] font-bold text-gray-100">
              {clickedFeature.feature.properties.name}
            </h3>
            <ul class="px-2.5 pb-2.5">
              <li>
                <span className="font-bold text-[#2e5983]">Award:</span>{" "}
                {clickedFeature.feature.properties.award.toLocaleString(
                  "en-US",
                  {
                    style: "currency",
                    currency: "USD",
                  }
                )}
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">Phase:</span>{" "}
                {clickedFeature.feature.properties.phase}
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">Type:</span>{" "}
                {clickedFeature.feature.properties.type}
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">Length:</span>{" "}
                {clickedFeature.feature.properties.length.toFixed(2)} miles
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">Sponsor:</span>{" "}
                {clickedFeature.feature.properties.sponsor}
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">Municipality:</span>{" "}
                {clickedFeature.feature.properties.municipality}
              </li>
              <li>
                <span className="font-bold text-[#2e5983]">County:</span>{" "}
                {clickedFeature.feature.properties.county}
              </li>
            </ul>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
};

const Page = () => {
  const {
    nodePage: {
      body,
      title,
      path,
      relationships: { field_theme, field_staff_contact },
    },
    navItem,
  } = pageData();
  const [features, setFeatures] = useState([]);
  const columns = [
    {
      name: "County",
      selector: (row) => row.properties.county,
      sortable: true,
      wrap: true,
      maxWidth: "20%",
    },
    {
      name: "Sponsor",
      selector: (row) => row.properties.sponsor,
      sortable: true,
      wrap: true,
      maxWidth: "20%",
    },
    {
      name: "Award",
      selector: (row) =>
        row.properties.award.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      sortable: true,
      sortFunction: (a, b) => a.properties.award - b.properties.award,
      wrap: true,
      maxWidth: "20%",
    },
    {
      name: "Name",
      selector: (row) => row.properties.name,
      sortable: true,
      wrap: true,
      maxWidth: "20%",
    },
    {
      name: "Year",
      selector: (row) => row.properties.year,
      sortable: true,
      wrap: true,
      maxWidth: "20%",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://arcgis.dvrpc.org/portal/rest/services/Transportation/RegionalTrailsProgram/FeatureServer/0/query?where=1=1&outfields=*&outsr=4326&f=geojson"
        );
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <>
      <Helmet>
        <link
          href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <title>{title} | DVRPC</title>
        {body.summary && <meta name="description" content={body.summary} />}
        <style>
          {`:root {
        ${themeToCustomVars(field_theme)}
      }`}
        </style>
      </Helmet>
      <Body title={title} menu={navItem}>
        <HtmlParser html={body.processed ?? ""} />
        <h3>Regional Trails Program - 2011 to Date</h3>
        <p>
          Click on any of the green line segments to see details about that
          trail.
        </p>
        <DVRPCMap features={features} />
        <DataTable data={features.features} columns={columns} />
      </Body>
      <StaffContact
        staffContact={field_staff_contact}
        title={title}
        location={path.alias}
      />
    </>
  );
};

export const Head = ({ data }) => {
  const {
    nodePage: {
      body,
      title,
      relationships: { field_theme },
    },
  } = data;
  return (
    <>
      <link
        href="https://api.tiles.mapbox.com/mapbox-gl-js/v3.8.0/mapbox-gl.css"
        rel="stylesheet"
      />
      <title>{title} | DVRPC</title>
      {body?.summary && <meta name="description" content={body?.summary} />}
      <style>
        {`:root {
        ${themeToCustomVars(field_theme)}
      }`}
      </style>
    </>
  );
};

const pageData = () => {
  const { nodePage, navItem } = useStaticQuery(
    graphql`
      query {
        nodePage(path: { alias: { eq: "/trails/regionaltrailsprogram" } }) {
          id
          title
          body {
            processed
            summary
          }
          path {
            alias
          }
          relationships {
            field_staff_contact {
              name: field_display_name
              title: field_title
              mail
            }
            field_theme {
              field_primary_color
              field_secondary_color
              field_third_color
              field_photo_credits
              relationships {
                field_banner_2x {
                  uri {
                    url
                  }
                }
                field_banner {
                  uri {
                    url
                  }
                }
              }
            }
          }
        }
        navItem(href: { eq: "/Trails/RegionalTrailsProgram/" }) {
          ...nestednavitem
        }
      }
    `
  );
  return { nodePage, navItem };
};

export default Page;
