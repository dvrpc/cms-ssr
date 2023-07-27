import React from "react";
import { graphql } from "gatsby";

import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../../components/HeadTemplate";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";

const title = "Public Participation Task Force Application";

const PPTFApplicationPage = ({ data, location }) => {
  const { userUser, navItem } = data;

  return (
    <>
      <Body title={title} menu={navItem}>
        <p>
          By applying to become a member of the Task Force, you understand that
          you will be working alongside other region residents to work with
          DVRPC to establish a diverse and engaged body to address the region's
          planning and public participation practices throughout DVRPC’s
          nine-county region. This application is an opportunity for you to
          share with us your personal experience living in the region and with
          planning projects. We take a holistic approach to selecting task force
          members. We are interested in hearing your thoughts about your
          communities future and transportation needs, regardless of your
          experience with transportation or planning projects.
        </p>
        <p>
          The Public Participation Task Force membership provides ongoing
          opportunities for interested residents of DVRPC’s nine-county region
          (Bucks, Chester, Delaware, Montgomery, and Philadelphia in
          Pennsylvania; and Camden, Burlington, Gloucester, and Mercer in New
          Jersey) to learn more about the regional planning and decision-making
          process from DVRPC staff and to share their thoughts on how DVRPC can
          improve its engagement process.{" "}
          <strong>
            Elected officials are not eligible to serve as at-large members of
            the Task Force
          </strong>{" "}
          due to the Task Force’s mission of engaging residents who do not
          already play a role in the planning process. As an elected official,
          you may actively participate in other DVRPC plans and programs, and
          the Commission continues to engage with the region's municipal and
          county governments through various specific programs.
        </p>
        <h2>About You</h2>
        <form
          action="https://www2.dvrpc.org/asp/pptfapplication/save23.aspx"
          method="POST"
        >
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" required />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          <label htmlFor="address">Home Address</label>
          <input type="text" name="address" id="address" required />
          <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" required />
          <label htmlFor="zip">Zip</label>
          <input type="text" name="zip" id="zip" required />
          <label htmlFor="county">County</label>
          <select name="county" id="county" required>
            <option></option>
            <option>Bucks</option>
            <option>Burlington</option>
            <option>Camden</option>
            <option>Chester</option>
            <option>Delaware</option>
            <option>Gloucester</option>
            <option>Mercer</option>
            <option>Montgomery</option>
            <option>Philadelphia</option>
          </select>
          <label htmlFor="phone">Preferred Phone Number</label>
          <input type="phone" name="phone" id="phone" required />
          <label htmlFor="occupation">Occupation</label>
          <input type="text" name="occupation" id="occupation" required />
          <label htmlFor="resident">
            How long have you lived in DVRPC’s region?
          </label>
          <select name="resident" id="resident" required>
            <option></option>
            <option>Less than one year</option>
            <option>1-5 years</option>
            <option>5 -10 years</option>
            <option>10-20 years</option>
            <option>Over 20 years</option>
          </select>
          <label htmlFor="referral">
            How did you find out about the Public Participation Task Force?
          </label>
          <select name="referral" id="referral" required>
            <option></option>
            <option>DVRPC Social</option>
            <option>DVRPC Email</option>
            <option>Other org social or email (please specify)</option>
            <option>Word of mouth (please specify)</option>
            <option>Other (please specify)</option>
          </select>
          <input
            placeholder="Other/Word of Mouth (please specify)"
            name="referral_other"
          />
          <h3>Experience and Interest</h3>
          <p>
            List any experience from the past five years that you feel supports
            your application to become a Task Force member.{" "}
            <em>
              (Examples of this experience include working on community
              organizations, boards, agencies, volunteer groups, school groups,
              and part-time or seasonal work such as poll worker, library aide,
              PTA, etc.)
            </em>
          </p>
          <fieldset className="card">
            <label htmlFor="exp1_org">Organization 1</label>
            <input type="text" name="exp1_org" id="exp1_org" />
            <div className="gap-4 md:flex">
              <div className="md:w-1/2">
                <label htmlFor="exp1_city">City</label>
                <input type="text" name="exp1_city" id="exp1_city" />
              </div>
              <div className="md:w-1/2">
                <label htmlFor="exp1_state">State</label>
                <input type="text" name="exp1_state" id="exp1_state" />
              </div>
            </div>
            <label htmlFor="exp1_date">Relevant Dates</label>
            <input type="text" name="exp1_date" id="exp1_date" />
            <label htmlFor="exp1_description">Description of your work</label>
            <input type="text" name="exp1_description" id="exp1_description" />
          </fieldset>
          <fieldset className="card">
            <label htmlFor="exp2_org">Organization 2</label>
            <input type="text" name="exp2_org" id="exp2_org" />
            <div className="gap-4 md:flex">
              <div className="md:w-1/2">
                <label htmlFor="exp2_city">City</label>
                <input type="text" name="exp2_city" id="exp2_city" />
              </div>
              <div className="md:w-1/2">
                <label htmlFor="exp2_state">State</label>
                <input type="text" name="exp2_state" id="exp2_state" />
              </div>
            </div>
            <label htmlFor="exp2_date">Relevant Dates</label>
            <input type="text" name="exp2_date" id="exp2_date" />
            <label htmlFor="exp2_description">Description of your work</label>
            <input type="text" name="exp2_description" id="exp2_description" />
          </fieldset>
          <fieldset className="card">
            <label htmlFor="exp3_org">Organization 3</label>
            <input type="text" name="exp3_org" id="exp3_org" />
            <div className="gap-4 md:flex">
              <div className="md:w-1/2">
                <label htmlFor="exp3_city">City</label>
                <input type="text" name="exp3_city" id="exp3_city" />
              </div>
              <div className="md:w-1/2">
                <label htmlFor="exp3_state">State</label>
                <input type="text" name="exp3_state" id="exp3_state" />
              </div>
            </div>
            <label htmlFor="exp3_date">Relevant Dates</label>
            <input type="text" name="exp3_date" id="exp3_date" />
            <label htmlFor="exp3_description">Description of your work</label>
            <input type="text" name="exp3_description" id="exp3_description" />
          </fieldset>
          <h3>Statements of Interest</h3>
          <p>
            The purpose of the Task Force is to meaningfully engage with
            residents in the region, create an educational forum for the
            regional transportation planning process, and elevate the voices of
            community members. To better understand your interest in joining the
            PPTF, please answer the questions below with short responses.
          </p>
          <label htmlFor="interest">
            1. What interests you in being a part of the regional planning
            process? (150-word max)
          </label>
          <textarea
            name="interest"
            id="interest"
            maxlength="500"
            required
          ></textarea>
          <label htmlFor="contributions">
            2. What specific contributions do you hope to make if chosen to join
            the task force? (150-word max)
          </label>
          <textarea name="contributions" id="contributions" required></textarea>
          <label htmlFor="topics">
            3. What community topics concern you would you like to discuss in
            the task force? Why do you feel that this community topic is
            important? (150-word max)
          </label>
          <textarea name="topics" id="topics" required></textarea>
          <label>
            Check off your areas of experience. Experience is defined as
            academic, personal experience, paid work, and/or volunteer
            experience in the topic area. Select all that apply.
          </label>
          <div className="flex flex-col">
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Bicycle, Pedestrian, or Transit Planning"
              />{" "}
              Bicycle, Pedestrian, or Transit Planning
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Climate Change or Environmental Justice"
              />{" "}
              Climate Change or Environmental Justice
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Community Engagement"
              />{" "}
              Community Engagement
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Geographical Information Systems (GIS)"
              />{" "}
              Geographical Information Systems (GIS)
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Good movements or Freight"
              />{" "}
              Good movements or Freight
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Housing or Land Use Planning"
              />{" "}
              Housing or Land Use Planning
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Incident Management/First responders"
              />{" "}
              Incident Management/First responders
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Intelligent Transportation Systems (ITS)"
              />{" "}
              Intelligent Transportation Systems (ITS)
            </label>
            <label className="pt-1 font-normal">
              <input type="checkbox" name="expertise" value="Public Health" />{" "}
              Public Health
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Research, Policy, or Data Analyst"
              />{" "}
              Research, Policy, or Data Analyst
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Transportation Safety"
              />{" "}
              Transportation Safety
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="expertise"
                value="Other: please specify"
              />{" "}
              Other (please specify)
            </label>
          </div>
          <input
            type="text"
            name="expertise_other"
            id="expertise_other"
            placeholder="Other (please specify)"
          />
          <label>
            Check off areas you would like to learn more about. Select all that
            apply.
          </label>
          <div className="flex flex-col">
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Bicycle, Pedestrian, or Transit Planning"
              />{" "}
              Bicycle, Pedestrian, or Transit Planning
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Climate Change or Environmental Justice"
              />{" "}
              Climate Change or Environmental Justice
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Community Engagement"
              />{" "}
              Community Engagement
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Geographical Information Systems (GIS)"
              />{" "}
              Geographical Information Systems (GIS)
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Good movements or Freight"
              />{" "}
              Good movements or Freight
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Housing or Land Use Planning"
              />{" "}
              Housing or Land Use Planning
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Incident Management/First responders"
              />{" "}
              Incident Management/First responders
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Intelligent Transportation Systems (ITS)"
              />{" "}
              Intelligent Transportation Systems (ITS)
            </label>
            <label className="pt-1 font-normal">
              <input type="checkbox" name="learn" value="Public Health" />{" "}
              Public Health
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Research, Policy, or Data Analyst"
              />{" "}
              Research, Policy, or Data Analyst
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Transportation Safety"
              />{" "}
              Transportation Safety
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="learn"
                value="Other: please specify"
              />{" "}
              Other (please specify)
            </label>
          </div>
          <input
            type="text"
            name="learn_other"
            id="learn_other"
            placeholder="Other (please specify)"
          />
          <h3>Demographics</h3>
          <p>
            Task Force membership will ideally represent the region by
            geographic and demographic diversity. Please help us create a more
            inclusive group by sharing some of your demographic characteristics.
          </p>
          <label htmlFor="age">Age</label>
          <select name="age" id="age" required>
            <option></option>
            <option>Under 19</option>
            <option>20 to 24 years</option>
            <option>25 to 34 years</option>
            <option>35 to 44 years</option>
            <option>45 to 54 years</option>
            <option>55 to 59 years</option>
            <option>60 to 64 years</option>
            <option>65 to 74 years</option>
            <option>75 to 84 years</option>
            <option>85 years and over</option>
          </select>
          <label htmlFor="race">Race. Select all that apply.</label>
          <div className="flex flex-col">
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="race"
                value="Hispanic, Latino, or Spanish"
              />{" "}
              Hispanic, Latino, or Spanish origin (Mexican, Puerto Rican, Cuban,
              Salvadorian, Dominican, Colombian, Guatemalan, Spaniard, etc.):
              please specify
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="race"
                value="Black or African American"
              />{" "}
              Black or African American (Jamaican, Haitian, Nigerian, Ethiopian,
              Somali, etc.): please specify
            </label>
            <label className="pt-1 font-normal">
              <input type="checkbox" name="race" value="Asian" /> Asian
              (Chinese, Vietnamese, Korean, Hmong, Pakistani, Indian, etc.):
              please specify
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="race"
                value="Native Hawaiian or Pacific Islander"
              />{" "}
              Native Hawaiian or Pacific Islander (Chamorro, Samoan, Tongan
              etc.): please specify
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="race"
                value="Native American or Alaska Native"
              />{" "}
              Native American or Alaska Native: please specify enrolled or
              principal tribe
            </label>
            <label className="pt-1 font-normal">
              <input type="checkbox" name="race" value="White non-Hispanic" />{" "}
              White non-Hispanic (German, Irish, English, Italian, French,
              Polish, etc. ): please specify
            </label>
            <label className="pt-1 font-normal">
              <input
                type="checkbox"
                name="race"
                value="Middle Eastern or North African"
              />{" "}
              Middle Eastern or North African (Syria, Egypt, Lebanon, Morocco,
              Sudan, Yemen, Iran, Turkey, Kurd, etc. ): please specify
            </label>
            <label className="pt-1 font-normal">
              <input type="checkbox" name="race" value="Other" /> Other: please
              specify
            </label>
          </div>
          <input
            type="text"
            name="race_other"
            placeholder="Race Details (please specify)"
          />
          <label htmlFor="pronouns">Preferred Pronouns</label>
          <select name="pronouns" id="pronouns">
            <option></option>
            <option>She/Her</option>
            <option>He/Him</option>
            <option>Them/Their</option>
            <option>Other (please specify)</option>
          </select>
          <input
            type="text"
            name="pronouns_other"
            placeholder="Other (please specify)"
          />
          <label htmlFor="disability">
            Do you consider yourself a person with a disability?
          </label>
          <select name="disability" id="disability">
            <option></option>
            <option>Yes</option>
            <option>No</option>
            <option>Prefer not to answer</option>
          </select>
          <label htmlFor="additional">Anything else to share with us?</label>
          <textarea name="additional" id="additional"></textarea>
          <p>
            To submit your application, click the Apply button below.
            Applications are accepted year-round and reviewed annually in
            December/January. You will be contacted once your application enters
            the review process.
          </p>
          <p>
            If you do not receive a confirmation email after submitting your
            application, check your spam folder and/or contact Shoshana Akins,
            manager of the PPTF, at{" "}
            <a href="mailto:sakins@dvrpc.org">sakins@dvrpc.org</a> or
            215.238.2817.
          </p>
          <button className="btn btn-primary">Apply</button>
        </form>
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

export default PPTFApplicationPage;
