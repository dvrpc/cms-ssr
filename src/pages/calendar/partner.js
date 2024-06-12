import React from "react";
import { graphql } from "gatsby";

import Body from "../../components/Body";
import Calendar from "../../components/Calendar";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import StaffContact from "../../components/StaffContact";

const title = "Partner Events";

const PartnerEventsPage = ({ data, serverData, location }) => {
  const { userUser, navItem } = data;
  return (
    <>
      <Body title={title} menu={navItem}>
        <p>
          DVRPC maintains a calendar of events, workshops, and conferences
          hosted by our partners and related to planning for Greater
          Philadelphia. To have your event added to this calendar, please email{" "}
          <a href="mailto:public_affairs@dvrpc.org">public_affairs@dvrpc.org</a>
          .
        </p>
        <Calendar header="Upcoming" data={serverData} location={location} />
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "DVRPC maintains a calendar of events, workshops, and conferences hosted by our partners and related to planning for Greater Philadelphia.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "ahastings@dvrpc.org" }) {
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
    navItem(href: { regex: "/calendar/partner/i" }) {
      ...nestednavitem
    }
  }
`;

export default PartnerEventsPage;

export async function getServerData() {
  try {
    const res = await fetch(
      "https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?cal=partner"
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
