import React from "react";
import { Link, graphql } from "gatsby";

import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const LIMIT = 10;

const BusinessPage = ({ data, serverData, location, title }) => {
  console.log(data)
  const { userUser } = data;
  const params = new URL(location.href).searchParams;
  const showAll = (params.get("all") ?? "").toLowerCase() === "true";
  return (
    <>
      <Body title="Doing Business with DVRPC">
        <p>
          Vendors can find various business opportunities posted here. DVRPC
          occasionally posts Requests for Proposals (RFPs) for member
          governments as a courtesy.
        </p>
        <div className="card">
          <h2>Business Opportunities</h2>
          <table className="table-auto">
            <thead>
              <tr className="font-bold">
                <td>Title of Opportunity</td>
                <td>Organization</td>
                <td>Submission Date</td>
              </tr>
            </thead>
            <tbody>
              {serverData.map((business) => (
                <tr key={business.Id}>
                  <td>
                    <a href={business.Id}>{business.Title}</a>
                  </td>
                  <td>{business.Organization}</td>
                  <td>
                    {business.SubmissionDate
                      ? new Date(business.SubmissionDate).toLocaleDateString()
                      : "rolling basis"}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">
                  <div className="w-100 flex justify-between">
                    <Link
                      className="rounded-full bg-[var(--color-default)] px-4 py-2 text-white no-underline shadow-sm"
                      to={`?all=${!showAll}`}
                    >
                      View {showAll ? "Current" : "All"}
                    </Link>{" "}
                    {showAll ? (
                      <div className="flex gap-4">
                        {+params.get("offset") >= LIMIT ? (
                          <Link
                            className="rounded-full border border-[var(--color-default)] px-4 py-2 text-[var(--color-default)] no-underline shadow-sm"
                            to={`?all=true&offset=${
                              +params.get("offset") - LIMIT
                            }`}
                          >
                            Prev
                          </Link>
                        ) : null}{" "}
                        {serverData.length === LIMIT ? (
                          <Link
                            className="rounded-full border border-[var(--color-default)] px-4 py-2 text-[var(--color-default)] no-underline shadow-sm"
                            to={`?all=true&offset=${
                              +params.get("offset") + LIMIT
                            }`}
                          >
                            Next
                          </Link>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <h2>Important Notices</h2>
        <p>
          DVRPC sincerely appreciates your interest in projects sponsored by the
          Commission and thanks all participants for their involvement and
          submittals. Please continue to visit this webpage to view future
          opportunities.
        </p>
        <p>
          DVRPC will post all changes to its Requests for Proposals,
          Qualifications, and Quotations. All changes to contents or due dates
          will be posted to the original Request's webpage. Please check the
          status of each Request up until the due date to be certain that you
          have the latest information pertaining to that opportunity. If any
          changes are made or clarifications are provided, it will be reflected
          by "Additional information is available" notice under the title of the
          Opportunity.
        </p>
        <p>
          DVRPC considers any information submitted directly to the Commission
          through a notice of Opportunity announcement to be confidential and
          proprietary under its Access to Records Policy (available at:{" "}
          <a href="https://www.dvrpc.org/policies/">www.dvrpc.org/Policies</a>).
          While DVRPC does not make such information public, unsuccessful
          respondents may request a debrief meeting to discuss their submission
          and subsequent evaluation by contacting the Contracts Manager,{" "}
          <a href="mailto:jcrouch@dvrpc.org">jcrouch@dvrpc.org</a>.{" "}
        </p>

        <h2>Title VI Statement</h2>
        <p>
          <script src="/js/TitleVI.js" type="text/javascript"></script>
        </p>
        <p>
          The Delaware Valley Regional Planning Commission (DVRPC) fully
          complies with Title VI of the Civil Rights Act of 1964, the Civil
          Rights Restoration Act of 1987, Executive Order 12898 on Environmental
          Justice, and related nondiscrimination mandates in all programs and
          activities. DVRPC's website,{" "}
          <a href="https://www.dvrpc.org/">www.dvrpc.org</a>, may be translated
          into multiple languages. Publications and other public documents can
          usually be made available in alternative languages and formats, if
          requested. DVRPC’s public meetings are always held in ADA-accessible
          facilities, and held in transit-accessible locations whenever
          possible. Translation, interpretation, or other auxiliary services can
          be provided to individuals who submit a request at least seven days
          prior to a public meeting. Translation and interpretation services for
          DVRPC’s projects, products, and planning processes are available,
          generally free of charge, by calling{" "}
          <a href="tel:2155921800">(215) 592-1800</a>. All requests will be
          accommodated to the greatest extent possible.
        </p>
        <p>
          Any person who believes they have been aggrieved by an unlawful
          discriminatory practice by DVRPC under Title VI has a right to file a
          formal complaint. Any such complaint must be in writing and filed with
          DVRPC's Title VI Compliance Manager and/or the appropriate state or
          federal agency within 180 days of the alleged discriminatory
          occurrence. For more information on DVRPC's Title VI program or to
          obtain a{" "}
          <a href="https://www.dvrpc.org/GetInvolved/TitleVI/pdf/TitleVIComplaintForm_English.pdf">
            Title VI Complaint Form
          </a>
          , please visit:{" "}
          <a href="https://www.dvrpc.org/GetInvolved/TitleVI/">
            www.dvrpc.org/GetInvolved/TitleVI
          </a>
          , call <a href="tel:1-215-592-1800">(215) 592-1800</a>, or email{" "}
          <a href="mailto:public_affairs@dvrpc.org">public_affairs@dvrpc.org</a>
          .
        </p>

        <h2>Disadvantaged Business Enterprises</h2>
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
          in any subcontracts entered into:
        </p>
        <p>
          The contractor, sub recipient or subcontractor shall not discriminate
          on the basis of race, color, national origin, or sex in the
          performance of this contract. The contractor shall carry out
          applicable requirements of 49 CFR part 26 in the award and
          administration of this agreement.
        </p>

        <ul className="list-group">
          <li className="list-group-item">
            <a href="files/dbe_program.pdf">
              DVRPC Disadvantaged Business Enterprise Policy
            </a>{" "}
            <span className="sm">[0.2 MB pdf]</span>
          </li>
        </ul>
        <p>
          DVRPC encourages all prospective consultants to use the following
          links to the PA and NJ Unified Certification Program to locate DBE
          firms to utilize as sub-consultants.
        </p>
        <ul>
          <li>
            <a href="http://www.paucp.com/" rel="noopener" target="_blank">
              PA - Unified Certification Program
            </a>
          </li>
          <li>
            <a
              href="https://njucp.dbesystem.com/"
              rel="noopener"
              target="_blank"
            >
              NJ - Unified Certification Program
            </a>
          </li>
        </ul>

        <h2>
          Small Business Enterprise and Emerging Small Business Enterprise
          Programs
        </h2>
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
        <p>
          Contractors looking for certified SBEs can search these online
          databases:
        </p>
        <ul>
          <li>
            <a href="http://www.dotsbe.pa.gov/" rel="noopener" target="_blank">
              Pennsylvania Small Business Enterprise Program
            </a>
          </li>
          <li>
            <a
              href="http://www.nj.gov/transportation/business/civilrights/pdf/ESBEDirectory.pdf"
              rel="noopener"
              target="_blank"
            >
              New Jersey Emerging Small Business Enterprise (ESBE) Program
            </a>{" "}
            <span className="sm">[pdf]</span>
          </li>
        </ul>
        <p>
          Contractors must maintain records to ensure compliance with 49 C.F.R
          Part 26 obligations by indicating the number of DBE, SBE/ESBE, and
          non-DBE/SBE/ESBE subcontractors, the type of work performed on the
          project, documentation of efforts to secure DBE/SBE/ESBE firms for
          available subcontracting opportunities and the means of communication
          used to obtain the services of DBE/SBE/ESBEs, and dollar amounts paid
          to DBE/SBE/ESBEs.
        </p>

        <h2>Sample Forms</h2>
        <h3>Budget Proposals</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="files/DVRPC-price-proposal-consultant.xlsx">
              Consultant Contract Budget Proposal
            </a>
            <span className="sm"> [0.1 MB xlsx]</span>
          </li>
          <li className="list-group-item">
            <a href="files/DVRPC-price-proposal-non-profit.xls">
              Non-profit Contract Budget Proposal
            </a>
            <span className="sm"> [0.1 MB xls]</span>
          </li>
          <li className="list-group-item">
            <a href="files/DVRPC-price-proposal-member-government.xlsx">
              Member Government Contract Budget Proposal
            </a>
            <span className="sm"> [0.1 MB xlsx]</span>
          </li>
        </ul>
        <h3>Invoice Forms</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="files/DVRPC-Sample-Invoice-Forms-Consultant.xlsx">
              Consultant Sample Invoice Forms
            </a>
            <span className="sm"> [0.1 MB xlsx]</span>
          </li>
          <li className="list-group-item">
            <a href="files/DVRPC-Sample-Invoice-Forms-Non-Profit.xlsx">
              Non-profit Sample Invoice Forms
            </a>
            <span className="sm"> [0.1 MB xlsx]</span>
          </li>
          <li className="list-group-item">
            <a href="files/DVRPC-Sample-Invoice-Forms-Member-Government.xlsx">
              Member Government Sample Invoice Forms
            </a>
            <span className="sm"> [0.1 MB xlsx]</span>
          </li>
        </ul>
        <h3>Articles of Agreement</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="files/Basic-Standard-Articles-for-Subrecipients.pdf">
              Standard Articles of Agreement for Subrecipient
            </a>
            <span className="sm"> [0.4 MB pdf]</span>
          </li>
          <li className="list-group-item">
            <a href="files/Basic-Standard-Articles-for-Contractors.pdf">
              Standard Articles of Agreement for Contractors
            </a>
            <span className="sm"> [0.4 MB pdf]</span>
          </li>
        </ul>
      </Body>
      <StaffContact staffContact={userUser} title={title} location={location} />
    </>
  );
};

export const query = graphql`
  query {
    userUser(mail: { eq: "jcrouch@dvrpc.org" }) {
      id
      mail
      name: field_display_name
      title: field_title
    }
  }
`;

export default BusinessPage;

export async function getServerData({ query }) {
  try {
    const params = new URLSearchParams(query);
    const res = await fetch(
      `https://www.dvrpc.org/api/business?all=${params.get("all")}&offset=${
        params.get("offset") || 0
      }`
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
