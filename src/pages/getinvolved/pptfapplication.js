import React from "react";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const PPTFApplicationPage = () => {
  const submitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
      await fetch("https://staging.dvrpc.org/asp/pptfapplication/save.aspx", {
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
      <Body title="Public Participation Task Force Application">
        <p>
          The purpose of this application is to help DVRPC create a diverse,
          engaged body to address regional planning and public participation
          practices in the nine-county DVRPC region. Share with us your personal
          experience living in the region and with planning projects; you are an
          expert of your own community and we want to hear from you!
        </p>
        <p>
          Elected officials are not eligible to serve as at-large members of the
          Task Force because we are striving to engage citizens who do not
          already play a role in the planning process. As an elected official,
          you may actively participate in other DVRPC plans and programs, and we
          constantly endeavor to engage the region's municipal and county
          governments through a variety of specific programs.
        </p>
        <form method="POST" onSubmit={submitForm}>
          <fieldset>
            <label>
              <div>
                Name<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="name" required />
              </div>
            </label>
            <label>
              <div>
                Email<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="email" required />
              </div>
            </label>
            <label>
              <div>
                Home Address<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="address" required />
              </div>
            </label>
            <label>
              <div>
                City<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="city" required />
              </div>
            </label>
            <label>
              <div>
                Zip<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="zip" required />
              </div>
            </label>
            <label>
              <div>
                County<span className="sm">*</span>
              </div>
              <div>
                <select name="county" id="county" required>
                  <option disabled selected hidden>
                    Select...
                  </option>
                  <option>Bucks County</option>
                  <option>Burlington County</option>
                  <option>Camden County</option>
                  <option>Chester County</option>
                  <option>Delaware County</option>
                  <option>Gloucester County</option>
                  <option>Mercer County</option>
                  <option>Montgomery County</option>
                  <option>Philadelphia County</option>
                </select>
              </div>
            </label>
            <label>
              <div>Mailing Address (if different from above)</div>
              <div>
                <input type="text" name="mailing" />
              </div>
            </label>
            <label>
              <div>
                Preferred Phone<span className="sm">*</span>
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  required
                  pattern="^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                />
              </div>
            </label>
            <label>
              <div>
                Occupation<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="occupation" required />
              </div>
            </label>
          </fieldset>

          <fieldset>
            <p>
              How long have you lived in the nine-county region served by DVRPC
              (Bucks, Chester, Delaware, Montgomery, and Philadelphia in
              Pennsylvania; and Camden, Burlington, Gloucester, and Mercer in
              New Jersey)?<span className="sm">*</span>
            </p>
            <label className="pt-0">
              <input type="text" name="resident" required />
            </label>
          </fieldset>

          <fieldset>
            <p>
              Please list any community organizations, boards, or other agencies
              in which you actively participate or have participated in the last
              five years, as well as any other experience pertinent to the
              mission of this Task Force.
            </p>
            <table>
              <tbody>
                <tr>
                  <td>Organization</td>
                  <td>Position</td>
                  <td>Relevant Dates</td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="org_1" />
                  </td>
                  <td>
                    <input type="text" name="position_1" />
                  </td>
                  <td>
                    <input type="text" name="dates_1" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="org_2" />
                  </td>
                  <td>
                    <input type="text" name="position_2" />
                  </td>
                  <td>
                    <input type="text" name="dates_2" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="org_3" />
                  </td>
                  <td>
                    <input type="text" name="position_3" />
                  </td>
                  <td>
                    <input type="text" name="dates_3" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="org_4" />
                  </td>
                  <td>
                    <input type="text" name="position_4" />
                  </td>
                  <td>
                    <input type="text" name="dates_4" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" name="org_5" />
                  </td>
                  <td>
                    <input type="text" name="position_5" />
                  </td>
                  <td>
                    <input type="text" name="dates_5" />
                  </td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <fieldset>
            <div>
              How did you find out about the Public Participation Task Force?
              <span className="sm">*</span>
            </div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input
                type="radio"
                name="heardOf"
                value="DVRPC social media or newsletter"
              />
              DVRPC social media or newsletter
              <br />
              <input
                type="radio"
                name="heardOf"
                value="Email from DVRPC staff"
              />
              Email from DVRPC staff
              <br />
              <input
                type="radio"
                name="heardOf"
                value="Email/social media from local organization"
              />
              <input
                type="text"
                name="heardOf"
                placeholder="Email/social media from local organization: (please list organization here)"
              />
              <br />
              <input type="radio" name="heardOf" value="Prefer not to answer" />
              Word of mouth
              <br />
              <input type="radio" name="heardOf" value="Other" />
              <input
                type="text"
                name="heardOf"
                placeholder="Other, Please specify"
              />
            </div>
            <label></label>
          </fieldset>

          <fieldset>
            <p>
              Please provide two reference that may speak to your community
              involvement, leadership ability, or your interest in regional and
              transportation planning.
            </p>
            <label>
              <div>
                First Reference Name<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref1_name" required />
              </div>
            </label>
            <label>
              <div>
                Title<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref1_title" required />
              </div>
            </label>
            <label>
              <div>
                Affiliation<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref1_aff" required />
              </div>
            </label>
            <label>
              <div>
                Phone<span className="sm">*</span>
              </div>
              <div>
                <input
                  type="text"
                  name="ref1_phone"
                  required
                  pattern="^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                />
              </div>
            </label>
            <label>
              <div>Email</div>
              <div>
                <input type="text" name="ref1_email" required />
              </div>
            </label>
            <label>
              <div>
                Second Reference Name<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref2_name" required />
              </div>
            </label>
            <label>
              <div>
                Title<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref2_title" required />
              </div>
            </label>
            <label>
              <div>
                Affiliation<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref2_aff" required />
              </div>
            </label>
            <label>
              <div>
                Phone<span className="sm">*</span>
              </div>
              <div>
                <input type="text" name="ref2_phone" required />
              </div>
            </label>
            <label>
              <div>Email</div>
              <div>
                <input type="text" name="ref2_email" required />
              </div>
            </label>
          </fieldset>

          <fieldset>
            <p>
              <b>
                Statement of Interest<span className="sm">*</span>
              </b>
            </p>
            <p>
              The purpose of the Task Force is to meaningfully engage with
              residents in the region, create an educational forum for the
              regional transportation planning process, and elevate voices of
              community members. To better understand your interest in joining
              the PPTF, provide a statement of interest below (500 words
              maximum) that addresses the following:
            </p>
            <ul>
              <li>
                What do you hope to learn by becoming a member of the PPTF?
              </li>
              <li>
                What interests you about being a part of the regional planning
                process?
              </li>
            </ul>
            <textarea name="statement" id="statement" required></textarea>
          </fieldset>

          <fieldset>
            <p>
              <b>Expertise and Interests</b>
            </p>
            <div>
              Check off your area(s) of expertise. Select all that apply.
            </div>
            <p>
              Expertise is defined as academic, personal experience, paid work,
              and/or volunteer experience in the topic area. If "Other", please
              list your choice in that option.
            </p>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input
                type="checkbox"
                name="expertise"
                value="Advocacy/Community Organizing"
              />
              Advocacy/Community Organizing
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Aviation and Aviation Planning"
              />
              Aviation and Aviation Planning
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Bicycle and Pedestrian Planning"
              />
              Bicycle and Pedestrian Planning
              <br />
              <input type="checkbox" name="expertise" value="Climate Change" />
              Climate Change
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Communications/Marketing"
              />
              Communications/Marketing
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Community and/or Economic Development"
              />
              Community and/or Economic Development
              <br />
              <input type="checkbox" name="expertise" value="Engineering" />
              Engineering
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Environmental Issues"
              />
              Environmental Issues
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Goods Movement/Freight"
              />
              Goods Movement/Freight
              <br />
              <input type="checkbox" name="expertise" value="Housing" />
              Housing
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Incident Management/First Responder"
              />
              Incident Management/First Responder
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Intelligent Transportation Systems (ITS)"
              />
              Intelligent Transportation Systems (ITS)
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Land Use Planning"
              />
              Land Use Planning
              <br />
              <input type="checkbox" name="expertise" value="Public Health" />
              Public Health
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Public Involvement/Citizen Planning"
              />
              Public Involvement/Citizen Planning
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Research/Data Analysis"
              />
              Research/Data Analysis
              <br />
              <input
                type="checkbox"
                name="expertise"
                value="Transit/Transportation Safety Planning"
              />
              Transit/Transportation Safety Planning
              <br />
              <input type="checkbox" name="expertise" value="Other" />
              <input
                type="text"
                name="expertise"
                placeholder="Other, please specify"
              />
            </div>
            <label></label>
            <div>
              Check off topic areas you would like to learn more about. Select
              all that apply.
            </div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input
                type="checkbox"
                name="interests"
                value="Advocacy/Community Organizing"
              />
              Advocacy/Community Organizing
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Aviation and Aviation Planning"
              />
              Aviation and Aviation Planning
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Bicycle and Pedestrian Planning"
              />
              Bicycle and Pedestrian Planning
              <br />
              <input type="checkbox" name="interests" value="Climate Change" />
              Climate Change
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Communications/Marketing"
              />
              Communications/Marketing
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Community and/or Economic Development"
              />
              Community and/or Economic Development
              <br />
              <input type="checkbox" name="interests" value="Engineering" />
              Engineering
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Environmental Issues"
              />
              Environmental Issues
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Goods Movement/Freight"
              />
              Goods Movement/Freight
              <br />
              <input type="checkbox" name="interests" value="Housing" />
              Housing
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Incident Management/First Responder"
              />
              Incident Management/First Responder
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Intelligent Transportation Systems (ITS)"
              />
              Intelligent Transportation Systems (ITS)
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Land Use Planning"
              />
              Land Use Planning
              <br />
              <input type="checkbox" name="interests" value="Public Health" />
              Public Health
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Public Involvement/Citizen Planning"
              />
              Public Involvement/Citizen Planning
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Research/Data Analysis"
              />
              Research/Data Analysis
              <br />
              <input
                type="checkbox"
                name="interests"
                value="Transit/Transportation Safety Planning"
              />
              Transit/Transportation Safety Planning
              <br />
              <input type="checkbox" name="interests" value="Other" />
              <input
                type="text"
                name="interests"
                placeholder="Other, please specify"
              />
            </div>
          </fieldset>

          <fieldset>
            <p>
              <b>Demographics</b>
            </p>
            <p>
              Task Force membership will ideally represent the region by
              geographic and demographic diversity. Please help us create a more
              inclusive group by sharing some of your demographic
              characteristics.
            </p>
            <div>Age</div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input type="radio" name="age" value="Under 19" /> Under 19
              <br />
              <input type="radio" name="age" value="20 to 24 years" />
              20 to 24 years
              <br />
              <input type="radio" name="age" value="25 to 34 years" />
              25 to 34 years
              <br />
              <input type="radio" name="age" value="35 to 44 years" />
              35 to 44 years
              <br />
              <input type="radio" name="age" value="45 to 54 years" />
              45 to 54 years
              <br />
              <input type="radio" name="age" value="55 to 59 years" />
              55 to 59 years
              <br />
              <input type="radio" name="age" value="60 to 64 years" />
              60 to 64 years
              <br />
              <input type="radio" name="age" value="65 to 74 years" />
              65 to 74 years
              <br />
              <input type="radio" name="age" value="75 to 84 years" />
              75 to 84 years
              <br />
              <input type="radio" name="age" value="85 years and over" />
              85 years and over
              <br />
              <input type="radio" name="age" value="Prefer not to answer" />
              Prefer not to answer
            </div>
            <label></label>
            <div>Are you of Spanish, Hispanic, or Latino origin?</div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input type="radio" name="ethnicity" value="Yes" />
              Yes
              <br />
              <input type="radio" name="ethnicity" value="No" />
              No
              <br />
              <input
                type="radio"
                name="ethnicity"
                value="Prefer not to answer"
              />
              Prefer not to answer
              <br />
            </div>
            <div>Race (choose all that apply)</div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input type="checkbox" name="race" value="Black" />
              Black or African American
              <br />
              <input
                type="checkbox"
                name="race"
                value="Native American/American Indian or Alaskan Native"
              />
              Native American/American Indian or Alaskan Native
              <br />
              <input type="checkbox" name="race" value="Asian Indian" />
              Asian Indian
              <br />
              <input type="checkbox" name="race" value="Chinese" />
              Chinese
              <br />
              <input type="checkbox" name="race" value="Filipino" />
              Filipino
              <br />
              <input type="checkbox" name="race" value="Asian Indian" />
              Other Asian
              <br />
              <input type="checkbox" name="race" value="Japanese" />
              Japanese
              <br />
              <input type="checkbox" name="race" value="Korean" />
              Korean
              <br />
              <input type="checkbox" name="race" value="Vietnamese" />
              Vietnamese
              <br />
              <input type="checkbox" name="race" value="Native Hawaiian" />
              Native Hawaiian
              <br />
              <input
                type="checkbox"
                name="race"
                value="Guamanian or Chamorro"
              />
              Guamanian or Chamorro
              <br />
              <input type="checkbox" name="race" value="Samaon" />
              Samaon
              <br />
              <input
                type="checkbox"
                name="race"
                value="Other Pacific Islander"
              />
              Other Pacific Islander
              <br />
              <input type="checkbox" name="race" value="White" />
              White
              <br />
              <input type="checkbox" name="race" value="Other Race" />
              Some other race (fill out answer in "Other")
              <input
                type="text"
                name="race"
                placeholder="Other, Please specify"
              />
            </div>
            <div>Preferred Pronouns</div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input type="radio" name="pronouns" value="She/Her" />
              She/Her
              <br />
              <input type="radio" name="pronouns" value="He/Him" />
              He/Him
              <br />
              <input type="radio" name="pronouns" value="Them/Their" />
              Them/Their
              <br />
              <input type="radio" name="pronouns" value="Other" />
              <input
                type="text"
                name="pronouns"
                placeholder="Other, Please specify"
              />
              <br />
              <input
                type="radio"
                name="pronouns"
                value="Prefer not to answer"
              />
              Prefer not to answer
            </div>
            <div>Do you consider yourself a person with a disability?</div>
            <div className="[&>*]:inline [&>*]:w-auto">
              <input type="radio" name="disability" value="Yes" />
              Yes
              <br />
              <input type="radio" name="disability" value="No" />
              No
              <br />
              <input
                type="radio"
                name="disability"
                value="Prefer not to answer"
              />
              Prefer not to answer
            </div>
          </fieldset>
          <div>Experience with Diversity and Inclusion</div>
          <p>
            If there are additional aspects of your identity and/or experiences
            with diversity and inclusion that you would like to share, please do
            so below. You will not be asked to disclose this information to the
            Task Force or be the representative for that identity; this
            information will exclusively be used in the application review phase
            for DVRPC’s PPTF diversity and inclusion initiative.
          </p>
          <textarea name="diversity" id="diversity"></textarea>

          <div>Is there anything else you would like to share with us?</div>
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
            manager of the PPTF, at
            <a href="mailto:sakins@dvrpc.org">sakins@dvrpc.org</a> or
            215.238.2817.
          </p>

          <button id="nextLink" type="submit" className="btn btn-primary">
            Apply
          </button>
        </form>
      </Body>
      <StaffContact></StaffContact>
    </>
  );
};

export default PPTFApplicationPage;
