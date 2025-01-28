import React from "react";
import { graphql } from "gatsby";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";
import PPTFForm from "../../components/PPTFForm";

const title = "Public Participation Task Force Application";

const PPTFApplicationPage = ({ data, location }) => {
  const { userUser, navItem } = data;

  return (
    <>
      <Body title={title} menu={navItem}>
        <div>
          <p>
            The Public Participation Task Force membership provides ongoing
            opportunities for interested residents of DVRPC’s nine-county region
            (Bucks, Chester, Delaware, Montgomery, and Philadelphia in
            Pennsylvania; and Camden, Burlington, Gloucester, and Mercer in New
            Jersey) to learn more about the regional planning and
            decision-making process from DVRPC staff and to share their thoughts
            on how DVRPC can improve its engagement process.
          </p>
          <p>
            By applying to become a member of the Task Force, you understand
            that you will be working alongside other region residents to work
            with DVRPC to establish a diverse and engaged body to address the
            region's planning and public participation practices throughout
            DVRPC’s nine-county region. This application is an opportunity for
            you to share with us your personal experience living in the region
            and with planning projects. We take a holistic approach to selecting
            task force members. We are interested in hearing your thoughts about
            your community’s transportation and planning needs, regardless of
            your experience with transportation or planning projects.
          </p>
          <p>
            Due to the Task Force’s mission of engaging residents who do not
            already play a role in the planning process elected officials are
            not eligible to serve as at-large members of the Task Force. The
            Commission provides a range of other opportunities to engage with
            the region's municipal and county governments. If you are an elected
            official, the Commission welcomes your participation in its other
            plans, programs, and task forces.
          </p>
        </div>
        <PPTFForm />
        <div className="prose flex min-w-full flex-col items-center justify-center">
          <svg
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <h1 className="mb-0 text-2xl">Sorry Applications are closed</h1>
          <div>The application portal will reopen soon</div>
        </div>
        <hr />
        <div className="font-bold italic">
          <p>
            The Delaware Valley Regional Planning Commission (DVRPC) fully
            complies with Title VI of the Civil Rights Act of 1964, the Civil
            Rights Restoration Act of 1987, Executive Order 12898 on
            Environmental Justice, and related nondiscrimination mandates in all
            programs and activities. DVRPC's website, www.dvrpc.org, may be
            translated into multiple languages.
          </p>
          <p>
            Publications and other public documents can usually be made
            available in alternative languages and formats if requested. DVRPC’s
            public meetings are always held in ADA-accessible facilities, and
            held in transit-accessible locations whenever possible. Translation,
            interpretation, or other auxiliary services can be provided to
            individuals who submit a request at least seven days prior to a
            public meeting. Translation and interpretation services for DVRPC’s
            projects, products, and planning processes are available, generally
            free of charge, by calling (215) 592-1800. All requests will be
            accommodated to the greatest extent possible.
          </p>
          <p>
            Any person who believes they have been aggrieved by an unlawful
            discriminatory practice by DVRPC under Title VI has a right to file
            a formal complaint. Any such complaint must be in writing and filed
            with DVRPC's Title VI Compliance Manager and/or the appropriate
            state or federal agency within 180 days of the alleged
            discriminatory occurrence. For more information on DVRPC's Title VI
            program or to obtain a Title VI Complaint Form please visit{" "}
            <a href="https://www.dvrpc.org/GetInvolved/TitleVI">
              www.dvrpc.org/GetInvolved/TitleVI
            </a>{" "}
            or email{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              public_affairs@dvrpc.org
            </a>
            .
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
      "The Public Participation Task Force membership provides ongoing opportunities for interested residents to learn more about the regional planning and decision-making process from DVRPC staff and to share their thoughts on how DVRPC can improve its engagement process.",
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
    nodeTheme(id: { eq: "4efe086e-6f80-5b49-955a-164f14657f5a" }) {
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
    navItem(href: { regex: "/getinvolved/pptfapplication/i" }) {
      ...nestednavitem
    }
  }
`;

export default PPTFApplicationPage;
