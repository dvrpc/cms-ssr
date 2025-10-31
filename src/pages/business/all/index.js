import React from "react";
import { Link, graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import BusinessView from "../../../components/BusinessView";

const title = "Doing Business with DVRPC";
const LIMIT = 10;

const BusinessPage = (props) => <BusinessView title={title} {...props} />;
export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "Vendors can find various business opportunities posted here. DVRPC occasionally posts Requests for Proposals (RFPs) for member governments as a courtesy.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "jcrouch@dvrpc.org" }) {
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
    navItem(href: { regex: "/business/i" }) {
      ...navitem
      links {
        ...navitem
      }
      parent {
        ...navitem
        ... on NavItem {
          links {
            ...navitem
          }
        }
      }
    }
  }
`;

export default BusinessPage;
