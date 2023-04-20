import * as React from "react";
import { graphql } from "gatsby";
import DefaultPage from "../components/DefaultPage";
import HeadTemplate, { themeToCustomVars } from "../components/HeadTemplate";

const Page = ({ data: { navItem, nodePage, staffContact } }) => {
  const { body, ...props } = nodePage;
  return (
    <DefaultPage
      {...props}
      body={body.processed}
      location={nodePage.path.alias}
      navItem={navItem}
      staffContact={staffContact}
    />
  );
};

export const Head = ({ data }) => {
  const {
    nodePage: { body, title },
    nodeTheme,
  } = data;
  return HeadTemplate({
    title,
    summary: body?.summary,
    css: themeToCustomVars(nodeTheme),
  });
};

export const query = graphql`
  query ($id: String) {
    nodePage: nodeArticle(id: { eq: $id }) {
      id
      title
      body {
        processed
        summary
      }
      path {
        alias
      }
    }
    navItem(href: { regex: "/news/i" }) {
      ...navitem
      links {
        ...navitem
      }
      parent {
        ...navitem
      }
    }
    nodeTheme(title: { eq: "News" }) {
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
    staffContact: userUser(mail: { eq: "ahastings@dvrpc.org" }) {
      name: field_display_name
      title: field_title
      mail
    }
  }

  fragment navitem on NavItem {
    href
    link
    style
    class
  }
`;

export default Page;
