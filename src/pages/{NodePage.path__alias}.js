import * as React from "react";
import { graphql } from "gatsby";
import { isMatch } from "matcher";
import CommitteePage from "../components/CommitteePage";
import DefaultPage from "../components/DefaultPage";
import RegionalTrailsProgram from "../components/RegionalTrailsProgramPage";
import CedsPage from "../components/CedsPage.js";
import MunicipalExchange from "../components/MunicipalExchange";
import HeadTemplate, { themeToCustomVars } from "../components/HeadTemplate";

const templates = {
  "/economic/ceds": CedsPage,
  "/trails/regionaltrailsprogram": RegionalTrailsProgram,
  "/committees/**": CommitteePage,
  "/municipalhelpdesk": MunicipalExchange,
  "/**": DefaultPage,
};

const resolveTemplate = (url) => {
  const match = Object.keys(templates).filter((r) => isMatch(url, r));
  return templates[match[0]];
};

const Page = ({ data }) => {
  const { nodePage, navItem } = data;
  const Template = resolveTemplate(nodePage.path.alias);
  return (
    <Template
      body={nodePage.body.processed}
      title={nodePage.title}
      navItem={navItem}
      location={nodePage.path.alias}
      staffContact={nodePage.relationships.field_staff_contact}
    />
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
  return HeadTemplate({
    title,
    summary: body?.summary,
    css: themeToCustomVars(field_theme),
  });
};

export const query = graphql`
  query ($id: String, $regex: String!) {
    nodePage(id: { eq: $id }) {
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
    navItem(href: { regex: $regex }) {
      ...nestednavitem
    }
  }
  fragment navitem on NavItem {
    href
    link
    style
    class
    links {
      href
      link
      style
      class
    }
  }
  fragment nestednavitem on NavItem {
    ...navitem
    parent {
      ... on NavItem {
        ...navitem
        parent {
          ... on NavItem {
            ...navitem
            parent {
              ... on NavItem {
                ...navitem
                parent {
                  ... on NavItem {
                    ...navitem
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Page;
