import React, { useRef, useState } from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "components/HeadTemplate";
import Body from "components/Body";
import HtmlParser from "components/HtmlParser";
import StaffContact from "components/StaffContact";

const BoardActionItemPage = ({
  data: { navItem, userUser },
  serverData,
  location,
}) => {
  const title = "DVRPC Board Action Item";
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useRef(null);

  return (
    <>
      <Body title={title} menu={navItem}>
        {serverData.Type === "TIP" ? (
          <>
            <h2>
              {serverData.Agendanum}. Transportation Improvement Program (TIP)
              Action
            </h2>
            <h3>
              {serverData.Actionid}: {serverData.Title}
            </h3>
          </>
        ) : (
          <h2>
            {serverData.Agendanum}: {serverData.Title}
          </h2>
        )}
        <HtmlParser html={serverData.Details} />
        <h3>Action Proposed</h3>
        <HtmlParser html={serverData.Action} />
        {serverData.PdfLink ? (
          <>
            <h3>Attachments</h3>
            <a href={serverData.PdfLink}>Download attachment</a>
          </>
        ) : (
          ""
        )}
        <p>
          <em>
            Last updated:{" "}
            {new Date(serverData.Dateadded).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </em>
        </p>
        <div class="card">
          <form
            onSubmit={(e) =>
              fetch(form.current.action, {
                method: form.current.method,
                body: new FormData(form.current),
              })
                .then((d) => d.json())
                .then((d) => {
                  setIsSubmitted(d !== null);
                  e.preventDefault();
                })
            }
            action="https://www2.dvrpc.org/api/comments/"
            method="POST"
            ref={form}
          >
            <input
              type="hidden"
              name="ActionItemId"
              defaultValue={serverData.Id}
            />
            <fieldset>
              <label htmlFor="fname">First Name: </label>
              <input
                required
                className="form-control"
                type="text"
                name="fname"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="lname">Last Name: </label>
              <input
                required
                className="form-control"
                type="text"
                name="lname"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="email">Email: </label>
              <input
                required
                className="form-control"
                type="email"
                name="email"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="zip">Zip Code: </label>
              <input required className="form-control" type="text" name="zip" />
            </fieldset>
            <fieldset>
              <label htmlFor="Comments">Comments: </label>
              <textarea required className="form-control" name="Comments" />
            </fieldset>
            <fieldset className="mt-4">
              {isSubmitted ? (
                <p className="mt-4 rounded-sm bg-green-300 px-4 py-2">
                  <em>
                    Your comment has been submitted to public_affairs@dvrpc.org.
                    Please check your email for confirmation.
                  </em>
                </p>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}
            </fieldset>
          </form>
        </div>
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme }, serverData }) => {
  return HeadTemplate({
    title: `Board Action Item - ${serverData.Title}`,
    summary: `DVRPC Board Action Item - ${serverData.Title} on ${serverData.Boarddate}`,
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });
};

export const query = graphql`
  query {
    userUser(mail: { eq: "renee.wise@dvrpc.org" }) {
      name: field_display_name
      title: field_title
      mail
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
    navItem(href: { regex: "/^/getinvolved/boardactionitems/$/i" }) {
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
  fragment navitem on NavItem {
    href
    link
    style
    class
  }
`;

export default BoardActionItemPage;

export async function getServerData({ params }) {
  try {
    const res = await fetch("https://www.dvrpc.org/api/actionitems");
    if (!res.ok) {
      throw new Error("Response failed");
    }
    const json = await res.json();

    return {
      props: json.filter((i) => i.Id === parseInt(params.id, 10))[0],
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
