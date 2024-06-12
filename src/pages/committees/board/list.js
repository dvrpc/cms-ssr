import React from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";

const title = "DVRPC Board";

const BoardDetails = ({ committee }) => {
  return (
    <details>
      <summary>{committee.Name}</summary>
      <div className="flex flex-col gap-4 py-4">
        {committee.Members.filter((member) => member.Name)
          .sort((a, b) => (a.Order > b.Order ? 1 : -1))
          .map((member) => {
            return (
              <div key={member.Id}>
                <div className="font-bold">{member.Name}</div>
                <div>{member.Title}</div>
                <div>
                  {member.Street}{" "}
                  {member.Street2 && (
                    <>
                      <br />
                      {member.Street2}
                    </>
                  )}
                </div>
                <div>
                  {member.City}, {member.State} {member.Zip}
                </div>
                {member.Phone && <div>Phone: {member.Phone}</div>}
                {member.Email && (
                  <a className="underline" href={`mailto:${member.Email}`}>
                    {member.Email}
                  </a>
                )}
              </div>
            );
          })}
      </div>
    </details>
  );
};

const BoardListPage = ({ data, serverData, location }) => {
  const { userUser, navItem } = data;
  const { Board, Officers } = serverData;

  return (
    <>
      <Body title={title} menu={navItem}>
        <div className="mt-4">
          The Board is an 18-member body having the authority and responsibility
          to make decisions affecting the entire organization as well as the
          nine-county region. It creates and defines the duties of the Office of
          the Executive Director and the various DVRPC committees; and approves
          and adopts the annual planning work program. In its capacity as the
          Metropolitan Planning Organization (MPO) for the region, the Board
          establishes regional transportation policies, determines allocation of
          available transportation funds and prioritizes transportation projects
          for the region. In addition to transportation planning for highways,
          transit, airports and freight, the agency develops plans and policies
          for other regional physical planning elements such as land use, air
          quality, housing, water supply and water quality.
        </div>
        <h2>Officers:</h2>
        {Officers.sort((a, b) => (a.Order > b.Order ? 1 : -1)).map(
          (officer) => {
            return (
              <div key={officer.Order}>
                <strong>{officer.Title}:</strong> <span>{officer.Name}</span>
              </div>
            );
          }
        )}
        <h2>Board Members and Alternates</h2>
        {Board.sort((a, b) => (a.Order > b.Order ? 1 : -1)).map((committee) => (
          <BoardDetails key={committee.Id} committee={committee} />
        ))}
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "The Board is an 18-member body having the authority and responsibility to make decisions affecting the entire organization as well as the nine-county region.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "renee.wise@dvrpc.org" }) {
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
    navItem(href: { regex: "/committees/board/list/i" }) {
      ...nestednavitem
    }
  }
`;

export default BoardListPage;

export async function getServerData() {
  try {
    const res = await fetch(`https://www.dvrpc.org/api/board`);
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
