import React from "react";
import { graphql } from "gatsby";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";
import useSWR from "swr";

const title = "Board Action Item";

const isOpenToComment = (boardDate) => {
  let closedDate = new Date(boardDate);
  closedDate.setHours(closedDate.getHours() - 12);
  const today = new Date();
  if (today < closedDate) return true;
  else return false;
};

const BoardActionItems = ({ data, location, serverData, id }) => {
  const { userUser, navItem } = data;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("ActionItemId", id);
    try {
      const response = await fetch("https://www.dvrpc.org/api/comments", {
        method: "POST",
        body: new URLSearchParams(formData),
      });

      if (!response.ok) {
        window.alert("Failed to submit form");
        throw new Error("Failed to submit form");
      }
      const success = confirm("Comment has been sent. Thank you!");
      if (success) window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const fetcher = async (url) => {
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) return url;
    else return null;
  };
  const {
    data: actionattachment,
    isLoading: attachementIsLoading,
    error,
  } = useSWR(
    `https://www.dvrpc.org/committees/board/action/${new Date(
      serverData.boarddate
    )
      .toISOString()
      .slice(0, 7)}_${
      serverData.type === "TIP" ? "TIP" : serverData.agendanum
    }`,
    fetcher
  );

  return (
    <>
      <Body menu={navItem}>
        <div className="flex items-center">
          <h2 className="m-0">Action Item</h2>
          <span className="ml-auto">
            Date Prepared:{" "}
            {new Date(serverData.date_added).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <h2 className="underline">Agenda Item:</h2>
        <h2>
          <span>{serverData.Agendanum}</span>{" "}
          <span className="underline">{serverData.title}</span>
        </h2>
        <div dangerouslySetInnerHTML={{ __html: serverData.details }} />
        {(serverData.rtc || serverData.staff) && <h2>Recommendations:</h2>}
        {serverData.rtc && (
          <p>
            <span className="font-bold underline">
              Regional Technical Committee (RTC):
            </span>{" "}
            {serverData.rtc}
          </p>
        )}
        {serverData.staff && (
          <p>
            <span className="font-bold underline">DVRPC Staff:</span>{" "}
            {serverData.staff}
          </p>
        )}
        <h2>Action Proposed:</h2>
        <div dangerouslySetInnerHTML={{ __html: serverData.details }} />
        {!attachementIsLoading && !error && (
          <>
            <h2>Attachments</h2>
            <a
              href={`https://www.dvrpc.org/committees/board/action/${new Date(
                serverData.boarddate
              )
                .toISOString()
                .slice(0, 7)}_${
                serverData.type === "TIP" ? "TIP" : serverData.agendanum
              }`}
              target="_blank"
            >
              Download attachments for this action item
            </a>
          </>
        )}

        {isOpenToComment(serverData.boarddate) ? (
          <form onSubmit={handleSubmit} autocomplete="off">
            <p>
              Enter a comment about this action item for review by the DVRPC
              Board.
            </p>
            <label htmlFor="fname">First Name:</label>
            <input type="text" id="fname" name="FirstName" required />
            <label htmlFor="lname">Last Name:</label>
            <input type="text" id="lname" name="LastName" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="Email" required />
            <label htmlFor="zip">Zip Code:</label>
            <input type="text" maxlength="5" name="Zip" id="zip" required />
            <label htmlFor="comment">Comments:</label>
            <textarea id="comment" name="Comments" required></textarea>
            <button className="btn btn-primary mt-4" type="submit">
              Submit
            </button>
            <p className="italic text-[#666]">
              DVRPC reserves the right to delete comments that are offensive,
              abusive, or off-topic. Only one comment per action item will be
              recorded per verified email account. Comments that are not
              verified by clicking on the link sent to the email you provided us
              will be treated as spam and eventually deleted by our program.
            </p>
          </form>
        ) : (
          <div className="text-red-500">
            Comments for this action item are currently not being accepted.
          </div>
        )}
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
    userUser(mail: { eq: "ahastings@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
    nodeTheme {
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
    navItem(href: { regex: "/getinvolved/i" }) {
      ...nestednavitem
    }
  }
`;

export default BoardActionItems;

export async function getServerData(context) {
  try {
    const res = await fetch(
      `https://apis.dvrpc.org/internal/boardactioncomment/actionitems/${context.params.id}`
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
