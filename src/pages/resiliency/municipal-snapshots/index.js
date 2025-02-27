import React, { useState } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Menu from "../../../components/Menu.obsolete";
import InfoLinks from "../../../components/InfoLinks";

import StaffContact from "../../../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";

import bgImage from "../../../images/mcvs_banner.jpg";
const title = "PA Municipal Coastal Vulnerability Snapshots";

const MunicipalityDropdown = ({municipalities}) => {
  
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  const handleSelectChange = (event) => {
    setSelectedMunicipality(event.target.value);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", padding: "1em 0" }}>
      <div style={{ flexGrow: 1 }}>
        <select
          id="municipality-select"
          value={selectedMunicipality}
          onChange={handleSelectChange}
          style={{
            width: "100%",
            padding: "0.5em",
            fontSize: "1em",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          <option value="" disabled>
            Select a municipality
          </option>
          {municipalities.map((municipality) => (
            <option key={municipality.geoid} value={municipality.name}>
              {municipality.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{ marginLeft: "1em" }}>
        <Link
          to={`/resiliency/municipal-snapshots/${selectedMunicipality
            .toLowerCase()
            .replace(/ /g, "-")}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5em 1em",
            fontSize: "1em",
            borderRadius: "4px",
            border: `1px solid ${selectedMunicipality ? "#f5f5f5" : "#4A7B83"}`,
            backgroundColor: selectedMunicipality ? "#4A7B83" : "#f5f5f5",
            color: selectedMunicipality ? "#f5f5f5" : "#4A7B83",
            textDecoration: "none",
            cursor: selectedMunicipality ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
          }}
        >
          View Municipal Snapshot
          <span
            style={{
              marginLeft: "0.5em",
              display: "inline-block",
              transform: "rotate(-45deg)",
              border: "solid",
              borderColor: `${selectedMunicipality ? "#f5f5f5" : "#4A7B83"}`,
              borderWidth: "0 2px 2px 0",
              padding: "3px",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

const paCoastal = ({ data, location }) => {
  const { userUser, navItem } = data;
  return (
    <>
      <div className="container mx-auto my-4 grid gap-x-12 print:block print:!max-w-full print:text-black sm:grid-cols-1 md:grid-cols-3">
        {/* <h1 className="mt-1 max-w-[80ch] px-4 text-4xl font-bold text-[color:var(--color-h1)] print:max-w-full print:p-0 md:col-span-2 md:col-start-2 md:p-0">
          {title}
        </h1> */}
        <main className="main px-4 pt-0 print:p-0 md:col-span-2 md:col-start-2 md:row-start-2 md:p-0">
          <p className="lead">
            Pennsylvania's climate is changing, which is predicted to affect
            many Pennsylvania communities, especially those along the Delaware
            River. With funding from the Pennsylvania Department of
            Environmental Protection (PADEP), DVRPC is working with Pennsylvania
            communities located in the Delaware Estuary Coastal Zone (DECZ) to
            help build their capacity to plan for and respond to increased
            flooding in the future.
          </p>
          <p>
            The Pennsylvania communities in the DECZ include municipalities in
            Bucks County and Delaware County, and the City of Philadelphia.
            These Municipal Coastal Vulnerability Snapshots provide access to
            critical information about the people, places, and assets that are
            at risk from climate impacts in communities in Pennsylvania's DECZ.
          </p>
          <h2>Select a Municipality</h2>
          <MunicipalityDropdown municipalities={data.municipalities.nodes} />
        </main>

        <div className="flex flex-col p-4 italic print:hidden md:col-span-1 md:col-start-1 md:row-start-2 md:mt-4 md:items-end md:p-0">
          <Menu data={navItem} />
          <InfoLinks />
        </div>
      </div>

      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "The DVRPC Data Center centralizes access to data and applications published by DVRPC for planning purposes. Watch this space for future content and enhancements as we continue to develop this site.",
    css: `
        --color-h1: #0f1a3a;
        --color-h2: #0f1a3a;
        --color-h3: #0f1a3a;
        --bg-cover-image: url(${bgImage});
        --height-banner: 25vw;
        `,
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "averbofsky@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    navItem(href: { regex: "/^/resiliency/i" }) {
      ...nestednavitem
    }
    nodeTheme(id: { eq: "0efb8b9d-ee32-58c6-897d-0a50ae2b5ac4" }) {
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
    municipalities: allPaCoastalMunicipalitiesJson {
      nodes {
        geoid
        name
      }
    }
  }
`;

export default paCoastal;
