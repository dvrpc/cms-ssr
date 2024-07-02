import React, { useState } from "react";
import { Link, graphql } from "gatsby";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";

const title = "FY2025 Work Program";

const WorkProgramPage = ({
  data: { userUser, navItem },
  serverData,
  location,
}) => {
  const [activeFilter, setActiveFilter] = useState(
    "DVRPC Program Area Descriptions"
  );

  const filteredData = serverData.filter(
    (project) => project.subsectiontitle === activeFilter
  );

  return (
    <>
      <Body title={title} menu={navItem}>
        <div className="my-4">
          At its January 25, 2024 meeting, the DVRPC Board adopted the Fiscal
          Year (FY) 2025 Unified Planning Work Program (UPWP). This document
          outlines all of the federally-funded planning projects slated for the
          nine-county region from July 1, 2024 to June 30, 2025. The PDF links
          below reflect the final version of DVRPC's adopted FY2025 UPWP as of
          July 1, 2024. As future amendments to the FY2025 UPWP are approved,
          they will be shown in the Work Program Amendments list.
        </div>
        <select
          className="form-control"
          onChange={(event) => setActiveFilter(event.currentTarget.value)}
          value={activeFilter}
        >
          {[
            "DVRPC Program Area Descriptions",
            "DVRPC Project Descriptions",
            "PA Supportive Regional Highway Planning Program (SRHPP)",
            "NJ Supportive Regional Highway Planning Program (SRHPP)",
            "PA Transit Support Program (TSP)",
            "NJ Transit Support Program (TSP)",
            "Other Member Government Projects",
            "Work Program Amendments",
          ].map((section) => (
            <option key={section}>{section}</option>
          ))}
        </select>
        <ul className="list-group">
          {filteredData.map((project) => (
            <li key={project.proid} className="list-group-item">
              <Link to={`/workprogram/fy2025/${project.proid}`}>
                {project.proid}: {project.proname}
              </Link>
            </li>
          ))}
        </ul>
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "The Fiscal Year (FY) 2025 Unified Planning Work Program (UPWP) outlines all of the federally-funded planning projects slated for the nine-county region.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "gkrykewycz@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
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
    navItem(href: { regex: "/^/workprogram/fy2025/?$/i" }) {
      ...nestednavitem
    }
  }
`;

export default WorkProgramPage;

export async function getServerData() {
  try {
    const res = await fetch(
      "https://apps.dvrpc.org/ords/workprogram25new/workprogram/projects"
    );
    if (!res.ok) {
      throw new Error("Response failed");
    }
    const json = await res.json();
    return {
      props: json.items,
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
