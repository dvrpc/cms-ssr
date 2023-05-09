import React from "react";
import { Link, graphql } from "gatsby";

import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";
import HeadTemplate, { defaultThemeConfig, themeToCustomVars } from "../../components/HeadTemplate";

const BusinessDetailsPage = ({ data, serverData, location, title }) => {
  const { userUser, navItem } = data;
  return (
    <>
      <Body
        title={
          <>
            {serverData.Title}
            <br />
            <small>
              {serverData.Type}, {serverData.Organization}
            </small>
          </>
        }
        menu={navItem}
      >
        <h2>Introduction</h2>
        <p>{serverData.Description}</p>
        <p>
          This {serverData.Type} will form the basis of a contract between{" "}
          {serverData.Organization} and the awarded vendor to complete all work
          for {serverData.Title}.
        </p>
        <h2>Availability</h2>
        <table className="table-striped table">
          <tbody>
            <tr>
              <td>Posting Date:</td>
              <td>
                <b>{new Date(serverData.StartDate).toLocaleDateString()}</b>
              </td>
            </tr>
            {serverData.QuestionDate && (
              <tr>
                <td>Submission of Inquiries by Email:</td>
                <td>
                  <b>
                    {new Date(serverData.QuestionDate).toLocaleDateString()}
                  </b>
                </td>
              </tr>
            )}
            <tr>
              <td>Proposal Deadline:</td>
              <td>
                <b>
                  {serverData.SubmissionDate
                    ? `${new Date(
                        serverData.SubmissionDate
                      ).toLocaleDateString()} ${
                        serverData.SubmissionTime ?? ""
                      }`
                    : "rolling basis"}
                </b>
              </td>
            </tr>
          </tbody>
        </table>
        {serverData.PDFLink ? (
          <p>
            <a
              href={`https://www.dvrpc.org/asp/PublicMeetingFiles/filedownload.aspx?fileid=${serverData.PDFLink.Id}&filename=${serverData.Id}_Opportunity.pdf`}
              className="rounded-full bg-[var(--color-default)] px-4 py-2 text-white no-underline shadow-sm"
            >
              Download {serverData.Type}
            </a>
          </p>
        ) : null}
        {serverData.NoticeLink ? (
          <div>
            <h2>Contract Award Notice</h2>
            <p>
              Upon approval by the DVRPC Board, a link to the contract award
              notice will be available below.
            </p>
            <p>
              <a
                href={`https://www.dvrpc.org/asp/PublicMeetingFiles/filedownload.aspx?fileid=${serverData.NoticeLink.Id}&filename=${serverData.Id}_Notice.pdf`}
                className="rounded-full bg-[var(--color-default)] px-4 py-2 text-white no-underline shadow-sm"
              >
                Download Notice
              </a>
            </p>
          </div>
        ) : null}
        {serverData.PrequalifiedLink ? (
          <div>
            <h2>Prequalified Consultants List</h2>
            <p>
              The Prequalified List is updated periodically to reflect newly
              added firms approved on a rolling basis.
            </p>
            <p>
              <a
                href={`https://www.dvrpc.org/asp/PublicMeetingFiles/filedownload.aspx?fileid=${serverData.PrequalifiedLink.Id}&filename=${serverData.Id}_Prequalified.pdf`}
                className="rounded-full bg-[var(--color-default)] px-4 py-2 text-white no-underline shadow-sm"
              >
                Download Prequalified List
              </a>
            </p>
          </div>
        ) : null}
        <h2>Information</h2>
        <p>
          A selection committee will be responsible for selecting the vendor
          best suited to handle the project.
        </p>
        <p>
          <a
            href={`mailto:${serverData.ContactEmail}?subject=${serverData.Title}`}
            className="rounded-full border border-[var(--color-default)] px-4 py-2 text-[var(--color-default)] no-underline shadow-sm"
          >
            Email Questions
          </a>
        </p>
        {serverData.AddendumLink ? (
          <div>
            <p>Additional information is now available:</p>
            <p>
              <a
                href={`https://www.dvrpc.org/asp/PublicMeetingFiles/filedownload.aspx?fileid=${serverData.AddendumLink.Id}&filename=${serverData.Id}_Clarifications.pdf`}
                className="rounded-full border border-[var(--color-default)] px-4 py-2 text-[var(--color-default)] no-underline shadow-sm"
              >
                Clarifications
              </a>
            </p>
          </div>
        ) : null}
        <h3>Title VI Statement</h3>
        <p>
          The Delaware Valley Regional Planning Commission (DVRPC) fully
          complies with Title VI of the Civil Rights Act of 1964, the Civil
          Rights Restoration Act of 1987, Executive Order 12898 on Environmental
          Justice, and related nondiscrimination mandates in all programs and
          activities. DVRPC's website, www.dvrpc.org, may be translated into
          multiple languages. Publications and other public documents can
          usually be made available in alternative languages and formats, if
          requested. DVRPC’s public meetings are always held in ADA-accessible
          facilities, and held in transit-accessible locations whenever
          possible. Translation, interpretation, or other auxiliary services can
          be provided to individuals who submit a request at least seven days
          prior to a public meeting. Translation and interpretation services for
          DVRPC’s projects, products, and planning processes are available,
          generally free of charge, by calling (215) 592-1800. All requests will
          be accommodated to the greatest extent possible.
        </p>
        <p>
          Any person who believes they have been aggrieved by an unlawful
          discriminatory practice by DVRPC under Title VI and/or ADA has a right
          to file a formal complaint. Any such complaint must be in writing and
          filed with DVRPC's Title VI Compliance Manager, Alison Hastings,
          and/or the appropriate state or federal agency within 180 days of the
          alleged discriminatory occurrence. For more information on DVRPC's
          Title VI program or to obtain a Title VI Complaint Form, please visit:{" "}
          <a href="https://www.dvrpc.org/GetInvolved/TitleVI">
            www.dvrpc.org/GetInvolved/TitleVI
          </a>
          , call (215) 592-1800, or email{" "}
          <a href="mailto:public_affairs@dvrpc.org">public_affairs@dvrpc.org</a>
          .
        </p>
        <h3>Disadvantaged Business Enterprises</h3>
        <p>
          The Delaware Valley Regional Planning Commission is committed to
          providing opportunities for Disadvantaged Business Enterprises (DBE)
          to compete for work. DBEs are certified by the Pennsylvania Unified
          Certification Program (PAUCP) and the New Jersey Unified Certification
          Program (NJUCP) in accordance with 49 CFR Part 26. Any party that
          enters into an agreement with DVRPC is encouraged to involve
          Disadvantaged Business Enterprises in the required work and to submit
          documentation of any such involvement in the proposal narrative and
          budget.
        </p>
        <p>
          Any party that enters into an agreement with DVRPC shall not
          discriminate on the basis of race, color, national origin, or sex in
          the award and performance of any agreement or in the administration of
          its DBE program or the requirements of 49 CFR part 26.
        </p>
        <p>
          All parties to DVRPC agreements shall take all necessary and
          reasonable steps under 49 CFR part 26 to ensure nondiscrimination in
          the award and administration of any subagreements and in addition each
          prime contractor or subrecipient must include the following assurance
          in any suncontracts entered into:
        </p>
        <p>
          The contractor, sub recipient or subcontractor shall not discriminate
          on the basis of race, color, national origin, or sex in the
          performance of this contract. The contractor shall carry out
          applicable requirements of 49 CFR part 26 in the award and
          administration of this agreement.
        </p>
        <h3>
          Small Business Enterprise and Emerging Small Business Enterprise
          Programs
        </h3>
        <p>
          In addition to DBEs, DVRPC encourages the use of small businesses
          under the following programs: Small Business Enterprise (SBE) in
          Pennsylvania, and Emerging Small Business Enterprise (ESBE) in New
          Jersey.
        </p>
        <p>
          Small business concerns are those entities seeking to participate in
          contracts that meet the definition of a small business concern set
          forth in Section 3 of the Small Business Act and Small Business
          Administration regulations as per 13 CFR Part 121.
        </p>
        <p>
          These programs are designed to facilitate greater participation of
          small businesses in transportation related procurements. Any party
          that enters into an agreement with DVRPC is encouraged to involve
          SBE/ESBEs in the required work and to submit documentation of any such
          involvement in the proposal narrative and budget.
        </p>
      </Body>
      <StaffContact staffContact={userUser} title={title} location={location} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title: "Doing Business with DVRPC",
    summary:
      "Vendors can find various business opportunities posted here. DVRPC occasionally posts Requests for Proposals (RFPs) for member governments as a courtesy.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "jcrouch@dvrpc.org" }) {
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
    navItem(href: { regex: "/business/i" }) {
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

export default BusinessDetailsPage;

export async function getServerData({ params }) {
  try {
    const res = await fetch(`https://www.dvrpc.org/api/business/${params.id}`);

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
