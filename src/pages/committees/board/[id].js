import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";

import AgendaPage from "../[name]/[id]";

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
