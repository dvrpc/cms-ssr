import React from "react";
import { Link, graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";
import Calendar from "../../components/Calendar";

const title = "Calendar";

const CalendarPage = ({ data, serverData, location }) => {
  const { userUser, navItem } = data;
  const submitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
      await fetch("https://www.dvrpc.org/getinvolved/events/send.aspx", {
        method: "POST",
        body: data,
      });
      if (window) window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Body title={title} menu={navItem}>
        <div className="my-4">
          The DVRPC Meeting Calendar is updated on a frequent basis with all
          internal and external DVRPC sponsored events. DVRPC does not permit
          external videotaping, audiotaping, or recording at its committee
          meetings. External taping is permitted at DVRPC's Board meeting when
          it is held in person; please inform staff of your intention to do so.
          Please note, since DVRPC is holding its committee meetings, including
          Board meetings, remotely via Zoom, staff may record the meeting to
          take meeting minutes, to share meeting content with committee members
          or members of the public, for educational purposes, or for other
          reasons not listed here. By continuing to stay on the remote meeting
          or entering a meeting already in progress, the attendee consents to be
          recorded.
        </div>
        <Calendar data={serverData} location={location} />
        <div>
          <h2>
            <Link to="/calendar/partner">Partner Events</Link>
          </h2>
          <p>
            DVRPC maintains a calendar of outside events related to the planning
            community for the benefit of our partners and website visitors. To
            have your event added to this calendar, please contact the{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              Office of Communications and Engagement
            </a>
            .
          </p>
        </div>
        <div>
          <h2>Accessibility and Language Access</h2>
          <p>
            Interpretation services and accommodations for individuals with
            disabilities can be provided to individuals who submit a request at
            least seven days prior to a public meeting. To request an
            accommodation or interpretation, including instantaneous
            translation, please fill out the form below and press "submit".
          </p>
          <p>
            If a request is made, an email is sent to public_affairs@dvrpc.org
            and a confirmation is sent to sender.
          </p>
          <p>
            You can also contact DVRPC's Office of Communications &amp;
            Engagement at 215-592-1800 or{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              public_affairs@dvrpc.org
            </a>
          </p>
          <div className="card">
            <h2>Interpretation or Accommodation Request</h2>
            <form method="POST" onSubmit={submitForm}>
              <fieldset form="interpretation-request">
                <label htmlFor="First Name">First Name: </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="First Name"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Last Name">Last Name: </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="Last Name"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Preferred Contact">
                  Preferred form of contact:{" "}
                </label>
                <select
                  required
                  className="form-control"
                  name="Preferred Contact"
                >
                  <option>Email</option>
                  <option>Phone</option>
                </select>
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Email">Email: </label>
                <input
                  required
                  className="form-control"
                  type="email"
                  name="Email"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Phone">Phone: </label>
                <input
                  required
                  className="form-control"
                  type="tel"
                  name="Phone"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Date of meeting">
                  Date of meeting you are requesting interpretation:{" "}
                </label>
                <small>
                  <em>selected date must be at least 7 days from today</em>
                </small>
                <input
                  required
                  className="form-control"
                  type="date"
                  name="Date"
                  id="date"
                  min="2023-04-27"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Meeting Name">The name of the meeting: </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="Meeting Name"
                  id="meeting-name"
                />
              </fieldset>

              <fieldset form="interpretation-request">
                <label htmlFor="Language">
                  Requested language or accommodation:{" "}
                </label>
                <input
                  required
                  className="form-control"
                  type="text"
                  name="Language"
                />
              </fieldset>

              <button
                id="submit-interpretation-request"
                className="btn btn-primary mt-6"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div>
          <h2>Title VI</h2>
          <p>
            The Delaware Valley Regional Planning Commission (DVRPC) fully
            complies with Title VI of the Civil Rights Act of 1964, the Civil
            Rights Restoration Act of 1987, Executive Order 12898 on
            Environmental Justice, and related nondiscrimination mandates in all
            programs and activities. DVRPC's website,{" "}
            <Link to="/">www.dvrpc.org</Link>, may be translated into multiple
            languages. Publications and other public documents can usually be
            made available in alternative languages and formats, if requested.
            DVRPC’s public meetings are always held in ADA-accessible
            facilities, and held in transit-accessible locations whenever
            possible. Translation, interpretation, or other auxiliary services
            can be provided to individuals who submit a request at least seven
            days prior to a public meeting. Translation and interpretation
            services for DVRPC’s projects, products, and planning processes are
            available, generally free of charge, by calling{" "}
            <a href="tel:1-215-592-1800">(215) 592-1800</a>. All requests will
            be accommodated to the greatest extent possible.
          </p>
          <p>
            Any person who believes they have been aggrieved by an unlawful
            discriminatory practice by DVRPC under Title VI has a right to file
            a formal complaint. Any such complaint must be in writing and filed
            with DVRPC's Title VI Compliance Manager and/or the appropriate
            state or federal agency within 180 days of the alleged
            discriminatory occurrence. For more information on DVRPC's Title VI
            program or to obtain a{" "}
            <a href="https://www.dvrpc.org/GetInvolved/TitleVI/pdf/TitleVIComplaintForm_English.pdf">
              Title VI Complaint Form
            </a>
            , please visit:{" "}
            <Link to="/getinvolved/titlevi">
              www.dvrpc.org/GetInvolved/TitleVI
            </Link>
            , call <a href="tel:1-215-592-1800">(215) 592-1800</a>, or email{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              public_affairs@dvrpc.org
            </a>
            .
          </p>
        </div>
        <div>
          <h2>Photography at a DVRPC Meeting or Event</h2>
          <p>
            Please be aware that by participating in DVRPC's public meetings and
            events you are automatically authorizing the Commission and its
            officers, employees, and assigns to use your name, photograph, or
            other likeness for the purposes related to the mission of DVRPC,
            including but not limited to outreach, marketing, websites, hardcopy
            publications, other electronic forms of media, and promotion of
            DVRPC and its various programs.
          </p>
        </div>
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary:
      "The DVRPC Meeting Calendar is updated on a frequent basis with all internal and external DVRPC sponsored events.",
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
    navItem(href: { regex: "/calendar/i" }) {
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

export default CalendarPage;

export async function getServerData(context) {
  const today = !context.params["*"]
    ? new Date()
    : new Date(context.params["*"]);
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toLocaleDateString();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  ).toLocaleDateString();

  try {
    const res = await fetch(
      `https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?timemin=${firstDay}&timemax=${lastDay}`
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
