import React from "react";
import { graphql } from "gatsby";

import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import WorkProgramView from "../../../components/workprogram/WorkProgramView";

const title = "FY2027 Work Program";

const WorkProgramDetailsPage = ({
  data: { userUser, navItem },
  serverData = {},
  location,
}) => {
  return (
    <>
      <Body title={title} menu={navItem}>
        <WorkProgramView project={serverData} />
      </Body>
      <StaffContact staffContact={userUser} title={title} location={location} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title: "Product Details",
    summary:
      "The Fiscal Year (FY) 2027 Unified Planning Work Program (UPWP) outlines all of the federally-funded planning projects slated for the nine-county region.",
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
    navItem(href: { regex: "/^/workprogram/fy2027/?$/i" }) {
      ...nestednavitem
    }
  }
`;

export default WorkProgramDetailsPage;

export async function getServerData({ params }) {
  try {
    const res = await fetch(
      `https://apps.dvrpc.org/ords/WORKPROGRAM27/workprogram/projects?proid=${params.id}`
    );

    if (!res.ok) {
      throw new Error("Response failed");
    }

    const json = await res.json();

    return {
      props: json.items[0],
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
