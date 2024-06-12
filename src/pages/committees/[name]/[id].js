import React from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import HtmlParser from "../../../components/HtmlParser";
import StaffContact from "../../../components/StaffContact";

const AgendaPage = ({ data, serverData, location }) => {
  const {
    Address1,
    Address2,
    City,
    Committee,
    CommitteeId,
    Locationname,
    Locationnote1,
    Locationnote2,
    Meetingdate,
    Meetingdetail,
    Meetingtime,
    Note1,
    Note2,
    Note3,
    State,
    Title,
  } = serverData;
  const title = Committee.Name;
  const nodePage = data.allNodePage.nodes.filter(
    (node) => node.path.alias.indexOf(CommitteeId.toLowerCase()) > -1
  )[0];
  const navItem = data.allNavItem.nodes.filter(
    (node) => node.href.toLowerCase().indexOf(CommitteeId.toLowerCase()) > -1
  )[0];

  return (
    <>
      <Body title={title} menu={navItem}>
        {Title ? <h2>{Title}</h2> : null}
        <p>
          {Meetingtime},{" "}
          <strong>
            {new Date(Meetingdate).toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </strong>
        </p>
        {new Date(Meetingdate) > new Date() && !!Note3 ? (
          <a href={Note3} className="btn btn-primary">
            Register Now
          </a>
        ) : null}
        {new Date(Meetingdate).toLocaleDateString() ===
          new Date().toLocaleDateString() && !!Note3 ? (
          <a href={Note3} className="btn btn-primary">
            Join Meeting
          </a>
        ) : null}
        {Note2 ? (
          <a href={Note2} className="btn btn-primary">
            Watch Recording
          </a>
        ) : null}
        {Note1 ? <p>{Note1}</p> : null}
        <p>
          {Locationname ? (
            <span>
              {Locationname}
              <br />
            </span>
          ) : null}
          {Address1 ? (
            <span>
              {Address1}
              <br />
            </span>
          ) : null}
          {Address2 ? (
            <span>
              {Address2}
              <br />
            </span>
          ) : null}
          {City ? <span>{City}, </span> : null}
          {State}
        </p>
        <p>
          {Locationnote1}
          <br />
          {Locationnote2}
        </p>
        <HtmlParser html={Meetingdetail} />
      </Body>
      <StaffContact
        staffContact={nodePage.relationships.field_staff_contact}
        location={location}
        title={title}
      />
    </>
  );
};

export const Head = ({ data, serverData }) => {
  const nodePage = data.allNodePage.nodes.filter(
    (node) => node.path.alias.indexOf(serverData.CommitteeId.toLowerCase()) > -1
  )[0];

  return HeadTemplate({
    title: serverData.Committee.Name,
    summary: `${serverData.Committee.Name} on ${
      serverData.Meetingdate.split(":")[0]
    } at ${serverData.Meetingtime}`,
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
    const res = await fetch(`https://www.dvrpc.org/api/agenda/${params.id}`);
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
