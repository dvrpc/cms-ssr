import React from "react";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const BoardActionItemsPage = ({ serverData }) => {
  return (
    <>
      <Body title="Comment on Board Actions">
        <div>
          The public can comment on Board Action items using an online
          commenting application on our website. These comments are considered
          public comments and are incorporated into the public record regarding
          DVRPC’s Board meeting.
        </div>
        <p>
          Information related to Board Action items will be posted below
          approximately 10 days before a scheduled{" "}
          <a href="/Committees/Board/">Board Meeting</a>. The online commenting
          feature will be live until 12 noon the day before the Board Meeting.
          The public may also submit comments during this period:
        </p>
        <ul>
          <li>
            by U.S. Mail (c/o Office of Communications &amp; Engagement, DVRPC,
            190 N. Independence Mall West, 8th Fl., Philadelphia, PA 19106);
          </li>
          <li>by fax at 215-592-9125; or,</li>
          <li>
            via e-mail at
            <a href="mailto:public_affairs@dvrpc.org?subject=Comments for DVRPC Board">
              public_affairs@dvrpc.org
            </a>
            .
          </li>
        </ul>
        <p>
          Members of the public may also attend and comment at the Board
          meeting. To do so, please contact the Office of Communications &amp;
          Engagement at 215-592-1800 or
          <a href="mailto:public_affairs@dvrpc.org">public_affairs@dvrpc.org</a>
          . DVRPC staff will follow up on any questions or comments, and all
          comments submitted will be forwarded to DVRPC Board members. We ask
          that comments at the Board meeting be limited to no more than 3
          minutes.
        </p>
        <div>
          <h2>Action Items</h2>
          {serverData.map((item) => (
            <div className="my-2">
              <a href={`/getinvolved/boardactionitems/${item.Id}`}>
                {item.Title}
              </a>
            </div>
          ))}
        </div>
      </Body>
      <StaffContact />
    </>
  );
};

export default BoardActionItemsPage;

export async function getServerData() {
  try {
    const res = await fetch(`https://www.dvrpc.org/api/actionitems`);
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
