import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { themeToCustomVars } from "./HeadTemplate";
import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";
import { Helmet } from "react-helmet";

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
        {/* form goes here */}
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
        nodePage(path: { alias: { eq: "/municipalhelpdesk" } }) {
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
        navItem(href: { eq: "/municipalhelpdesk/" }) {
          ...nestednavitem
        }
      }
    `
  );
  return { nodePage, navItem };
};

export default Page;
