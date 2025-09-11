import React from "react";
import { graphql, Link } from "gatsby";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";

const title = "Board Action Items";

const BoardActionItems = ({ data, location, serverData }) => {
  const { userUser, navItem } = data;

  console.log(navItem);

  return (
    <>
      <Body title={title} menu={navItem}>
        <div>
          <p>
            The public can comment on Board Action items using an online
            commenting application on our website. These comments are considered
            public comments and are incorporated into the public record
            regarding DVRPC’s Board meeting.
          </p>
          <p>
            Information related to Board Action items will be posted below
            approximately 10 days before a scheduled Board Meeting. The online
            commenting feature will be live until 12 noon the day before the
            Board Meeting. The public may also submit comments during this
            period:
          </p>
          <ul>
            <li>
              by U.S. Mail (c/o Office of Communications & Engagement, DVRPC,
              190 N. Independence Mall West, 8th Fl., Philadelphia, PA 19106);
            </li>
            <li>by fax at 215-592-9125; or,</li>
            <li>via e-mail at public_affairs@dvrpc.org.</li>
          </ul>
          <p>
            Members of the public may also attend and comment at the Board
            meeting. To do so, please contact the Office of Communications &
            Engagement at 215-592-1800 or public_affairs@dvrpc.org. DVRPC staff
            will follow up on any questions or comments, and all comments
            submitted will be forwarded to DVRPC Board members. We ask that
            comments at the Board meeting be limited to no more than 3 minutes.
          </p>
          <ul className="list-group">
            {serverData.map((action) => (
              <li>
                <Link to={`/getinvolved/boardactionitems/${action.Id}`}>
                  {action.Title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "sakins@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    nodeTheme(id: { eq: "5ae19d55-9213-5cd6-8db0-74e59dc2bfa3" }) {
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
    navItem(href: { regex: "/getinvolved/BoardActionItems/i" }) {
      ...nestednavitem
    }
  }
`;

export default BoardActionItems;

export async function getServerData() {
  try {
    const res = await fetch("https://www.dvrpc.org/api/actionitems");

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
