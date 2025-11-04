import React, { useEffect, useState } from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import HtmlParser from "../../../components/HtmlParser";
import StaffContact from "../../../components/StaffContact";
import TitleVI from "../../../components/TitleVI";

const AgendaPage = ({ data, serverData, location, name }) => {
  const {
    address1,
    address2,
    city,
    committee,
    committeeid,
    locationname,
    locationnote1,
    locationnote2,
    meetingdate,
    meetingdetail,
    meetingtime,
    note1,
    note2,
    note3,
    state,
    title,
    name: committeename,
  } = serverData.items[0];
  const pagetitle = committeename;
  const nodePage = data.allNodePage.nodes.filter(
    (node) => node.path.alias.indexOf(committeeid.toLowerCase()) > -1
  )[0];

  data.navItem.href = "";
  const navItem = {
    ...data.navItem,
    parent: {
      ...data.navItem.parent,
      links: [
        { link: pagetitle, href: `/committees/${name}` },
        ...data.navItem.parent.links,
      ],
    },
  };

  return (
    <>
      <Body title={pagetitle} menu={navItem}>
        {pagetitle ? <h2>{pagetitle}</h2> : null}
        <p>
          {meetingtime},{" "}
          <strong>
            {new Date(meetingdate).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            })}
          </strong>
        </p>
        {new Date(meetingdate) > new Date() && !!note3 ? (
          <a href={note3} className="btn btn-primary">
            Register Now
          </a>
        ) : null}
        {new Date(meetingdate).toLocaleDateString() ===
          new Date().toLocaleDateString() && !!note3 ? (
          <a href={note3} className="btn btn-primary">
            Join Meeting
          </a>
        ) : null}
        {note2 ? (
          <a href={note2} className="btn btn-primary">
            Watch Recording
          </a>
        ) : null}
        {note1 ? <p>{note1}</p> : null}
        <p>
          {locationname ? (
            <span>
              {locationname}
              <br />
            </span>
          ) : null}
          {address1 ? (
            <span>
              {address1}
              <br />
            </span>
          ) : null}
          {address2 ? (
            <span>
              {address2}
              <br />
            </span>
          ) : null}
          {city ? <span>{city}, </span> : null}
          {state}
        </p>
        <p>
          {locationnote1}
          <br />
          {locationnote2}
        </p>
        <HtmlParser html={meetingdetail} />
        <hr />
        <TitleVI />
      </Body>
      <StaffContact
        staffContact={nodePage.relationships.field_staff_contact}
        location={location}
        pagetitle={pagetitle}
      />
    </>
  );
};

export const Head = ({ data, serverData }) => {
  const nodePage = data.allNodePage.nodes.filter(
    (node) =>
      node.path.alias.indexOf(serverData.items[0].committeeid.toLowerCase()) >
      -1
  )[0];

  return HeadTemplate({
    title: serverData.items[0].name,
    summary: `${serverData.items[0].name} on ${
      serverData.items[0].meetingdate.split(":")[0]
    } at ${serverData.items[0].meetingtime}`,
    css: themeToCustomVars(
      nodePage.relationships.field_theme,
      defaultThemeConfig
    ),
  });
};

export const query = graphql`
  query {
    allNodePage(filter: { path: { alias: { regex: "/committees/.*/" } } }) {
      nodes {
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
    }
    navItem(href: { regex: "/committees/.*/" }) {
      ...nestednavitem
    }
  }
`;

export default AgendaPage;

export async function getServerData({ params }) {
  try {
    const res = await fetch(
      `https://apis.dvrpc.org/internal/dvrpcagenda/agendas/agenda?id=${params.id}`
    );
    if (!res.ok) {
      throw new Error("Response failed");
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
