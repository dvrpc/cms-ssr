import React, { useEffect, useState, useCallback } from "react";
import GenerateCaptcha from "./GenerateCaptcha";

const PPTFForm = () => {
  const action = "submit";
  const { generateToken, verifyCaptcha } = GenerateCaptcha();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await generateToken(action);
    if (!token) return;
    const formData = new FormData(event.target);
    if (verifyCaptcha(token, action))
      try {
        const response = await fetch(
          "https://www2.dvrpc.org/asp/pptfapplication/save23.aspx",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          window.alert("Failed to submit form");
          throw new Error("Failed to submit form");
        }
        const success = confirm(
          "Thank you for applying to the Public Participation Task Force (PPTF)"
        );
        if (success) window.location.reload();
      } catch (error) {
        console.error(error);
      }
    else {
      window.alert("Error verifying reCaptcha, please try again...");
      throw new Error("Failed to submit form");
    }
  };

  return (
    <form onSubmit={handleSubmit} autocomplete="off">
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
      <label htmlFor="mailing">Mailing Address (if different from above)</label>
      <input type="text" name="mailing" id="mailing" />
      <label htmlFor="phone">Phone Number</label>
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
        <option>6-10 years</option>
        <option>11-20 years</option>
        <option>Over 20 years</option>
      </select>
      <label htmlFor="referral">
        How did you find out about the Public Participation Task Force?
      </label>
      <select name="referral" id="referral" required>
        <option></option>
        <option>DVRPC’s social media or newsletter</option>
        <option>Other organization’s social media (please specify)</option>
        <option>Other organization’s newsletter (please specify)</option>
        <option>Word of mouth (please specify)</option>
        <option>Other (please specify)</option>
      </select>
      <input placeholder="Please specify" name="referral_other" />
      <h3>Experience and Interest</h3>
      <p>
        List any experience from the past five years that you feel supports your
        application to become a Task Force member. Examples of this experience
        include working on community organizations, boards, agencies, volunteer
        groups, school groups, and part-time or seasonal work such as poll
        worker, library aide, PTA, etc.
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
        <label htmlFor="exp1_date">Start Date to end date</label>
        <input type="text" name="exp1_date" id="exp1_date" />
        <label htmlFor="exp1_description">Brief description of your role</label>
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
        <label htmlFor="exp2_date">Start Date to end date</label>
        <input type="text" name="exp2_date" id="exp2_date" />
        <label htmlFor="exp2_description">Brief description of your role</label>
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
        <label htmlFor="exp3_date">Start Date to end date</label>
        <input type="text" name="exp3_date" id="exp3_date" />
        <label htmlFor="exp3_description">Brief description of your role</label>
        <input type="text" name="exp3_description" id="exp3_description" />
      </fieldset>
      <h3>Statements of Interest</h3>
      <p>
        The purpose of the Task Force is to meaningfully engage with residents
        in the region, create an educational forum for the regional
        transportation planning process, and elevate the voices of community
        members. To better understand your interest in joining the PPTF, please
        answer the questions below with short responses.
      </p>
      <label htmlFor="interest">
        1. Why are you interested in being a member of this task force?
        (150-word max)
      </label>
      <textarea
        name="interest"
        id="interest"
        maxlength="500"
        required
      ></textarea>
      <label htmlFor="contributions">
        2. How would you contribute to the task force if selected? (150-word
        max)
      </label>
      <textarea name="contributions" id="contributions" required></textarea>
      <label htmlFor="topics">
        3. What concerns or topics would you like to discuss in the task force?
        Why? (150-word max)
      </label>
      <textarea name="topics" id="topics" required></textarea>
      <label>
        Check off your areas of experience. Experience includes academic,
        personal experience, paid work, and/or volunteer experience in the topic
        area. (Select all that apply.)
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
            value="Natural Resource Management or Environmental Planning"
          />{" "}
          Natural Resource Management or Environmental Planning
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
            value="Goods movement or Freight"
          />{" "}
          Goods movement or Freight
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
            value="Incident Management and First Responder"
          />{" "}
          Incident Management and First Responder
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
        Check off areas you would like to learn more about. (Select all that
        apply.)
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
          <input type="checkbox" name="learn" value="Community Engagement" />{" "}
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
            value="Incident Management and First Responder"
          />{" "}
          Incident Management and First Responder
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
          <input type="checkbox" name="learn" value="Public Health" /> Public
          Health
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
          <input type="checkbox" name="learn" value="Transportation Safety" />{" "}
          Transportation Safety
        </label>
        <label className="pt-1 font-normal">
          <input type="checkbox" name="learn" value="Other: please specify" />{" "}
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
        We aim for Task Force membership to reflect the geographic and
        population makeup of the region. To help us build a group that
        represents a broad range of backgrounds and experiences, please consider
        sharing some information about yourself.
      </p>
      <label htmlFor="age">Age</label>
      <select name="age" id="age" required>
        <option></option>
        <option>17 to 19 years</option>
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
      <label htmlFor="race">Race/Ethnicity (Select all that apply.)</label>
      <div className="flex flex-col">
        <label className="pt-1 font-normal">
          <input
            type="checkbox"
            name="race"
            value="Hispanic, Latino, or Spanish"
          />{" "}
          Hispanic, Latino, or Spanish origin (Mexican, Puerto Rican, Cuban,
          Salvadorian, Dominican, Colombian, Guatemalan, Spaniard, etc.)
        </label>
        <label className="pt-1 font-normal">
          <input
            type="checkbox"
            name="race"
            value="Black or African American"
          />{" "}
          Black or African American (Jamaican, Haitian, Nigerian, Ethiopian,
          Somali, etc.)
        </label>
        <label className="pt-1 font-normal">
          <input type="checkbox" name="race" value="Asian" /> Asian (Chinese,
          Vietnamese, Korean, Hmong, Pakistani, Indian, etc.)
        </label>
        <label className="pt-1 font-normal">
          <input
            type="checkbox"
            name="race"
            value="Native Hawaiian or Pacific Islander"
          />{" "}
          Native Hawaiian or Pacific Islander (Chamorro, Samoan, Tongan etc.)
        </label>
        <label className="pt-1 font-normal">
          <input type="checkbox" name="race" value="White non-Hispanic" /> White
          non-Hispanic (German, Irish, English, Italian, French, Polish, etc.)
        </label>
        <label className="pt-1 font-normal">
          <input
            type="checkbox"
            name="race"
            value="Middle Eastern or North African"
          />{" "}
          Middle Eastern or North African (Syrian, Yemeni, Turkish, Egyptian,
          Moroccan, Sudanese, etc.)
        </label>
        <label className="pt-1 font-normal">
          <input
            type="checkbox"
            name="race"
            value="Native American or Alaska Native"
          />{" "}
          Native American or Alaska Native: please specify enrolled or principal
          tribe
        </label>
        <input type="text" name="race_other" placeholder="Please specify" />
        <label className="pt-1 font-normal">
          <input type="checkbox" name="race" value="Other" /> Other: please
          specify
        </label>
      </div>
      <input type="text" name="race_other" placeholder="Please specify" />
      <label htmlFor="pronouns">Preferred Pronouns</label>
      <select name="pronouns" id="pronouns">
        <option></option>
        <option>She/Her</option>
        <option>He/Him</option>
        <option>Them/They</option>
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
      <h3>
        <label htmlFor="additional">
          Is there anything else you would like to share with us?
        </label>
      </h3>
      <textarea name="additional" id="additional"></textarea>
      <p>
        To submit your application, click the Apply button below. Applications
        are accepted year-round and reviewed annually in December/January. You
        will be contacted once your application enters the review process.
      </p>
      <p>
        If you do not receive a confirmation email after submitting your
        application, check your spam folder or contact Shoshana Akins, Public
        Participation Planner at{" "}
        <a href="mailto:sakins@dvrpc.org">sakins@dvrpc.org</a> or 215-238-2853
      </p>
      <button className="btn btn-primary">Apply</button>
      <p>
        All information contained in the applications received will be kept
        confidential.
      </p>
    </form>
  );
};

export default PPTFForm;
