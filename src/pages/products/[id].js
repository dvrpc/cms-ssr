import React, { useState } from "react";
import { graphql } from "gatsby";

import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";
import HtmlParser from "../../components/HtmlParser";
import TitleVI from "../../components/TitleVI";
import GenerateCaptcha from "../../components/GenerateCaptcha";

const ProductDetailsPage = ({ data, serverData = {}, location, title }) => {
  const action = "submit";
  const { generateToken, verifyCaptcha } = GenerateCaptcha();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    const token = await generateToken(action);
    if (!token) return;
    const formData = new FormData(event.target);
    if (verifyCaptcha(token, action))
      try {
        const response = await fetch(
          "https://www.dvrpc.org/asp/pubs/send.aspx",
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
          "Thank you for submitting a translation request."
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

  serverData = serverData.items[0];
  if (!serverData) serverData = {};
  const { userUser, navItem } = data;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const heading1 = (
    <>
      {serverData.title}
      {serverData.subtitle ? (
        <div>
          <small>{serverData.subtitle}</small>
        </div>
      ) : null}
    </>
  );

  let year = "";
  let month = "";
  if (serverData.datelive) {
    [year, month] = serverData.datelive.split("-");
  }
  if (serverData.datepublished) {
    [year, month] = serverData.datepublished.split("-");
  }

  return (
    <>
      <Body title={heading1} menu={navItem}>
        <figure className="float-right ml-4 mb-4 w-3/5 max-w-[413px]">
          <a
            target="_blank"
            href={
              serverData.urllink?.trim().length
                ? serverData.urllink
                : `/Reports/${serverData.id}.pdf`
            }
          >
            <img
              src={`https://www.dvrpc.org/asp/pubs/402px/${serverData.id}.png`}
              alt={serverData.title}
            />
          </a>
        </figure>

        <p>
          <b>Product No.:</b> {serverData.id}
          <br />
          <b>Date Published:</b> {month}/{year}
          <br />
        </p>
        {serverData.urllink?.trim().length ? (
          <a
            className="btn btn-primary trackLink"
            rel="external"
            href={serverData.urllink}
          >
            Launch Product
          </a>
        ) : (
          <>
            <p>
              <a
                className="btn btn-primary trackLink"
                href={`/Reports/${serverData.id}.pdf`}
              >
                View/Download PDF
              </a>
            </p>
            <p>
              <em>
                If you would like to request a printed copy (or copies) of this
                product, please call DVRPC at 215-592-1800 or email the staff
                contact listed below. If you would like to request this
                publication or portion of this publication in another language
                or format, please fill out{" "}
                <a href="#translation-request-card">a request form</a>.
              </em>
            </p>
          </>
        )}
        <HtmlParser html={serverData.abstract} />
        <p>
          <strong>Geographic Area Covered:</strong> {serverData.geography}
        </p>
        <p>
          <strong>Key Words:</strong> {serverData.keywords}
        </p>

        <p>
          <strong>Staff Contact(s)</strong>
        </p>
        <ul>
          <li>
            <b>{serverData.staffcontactname}</b> (
            <a href={`mailto:${serverData.staffcontact}@dvrpc.org`}>
              {serverData.staffcontact}@dvrpc.org
            </a>
            )
          </li>
          {serverData.staffcontact2?.length ? (
            <li>
              <b>{serverData.staffcontact2name}</b> (
              <a href={`mailto:${serverData.staffcontact2}@dvrpc.org`}>
                {serverData.staffcontact2}@dvrpc.org
              </a>
              )
            </li>
          ) : null}
        </ul>
        {serverData.projectteam?.length ? (
          <>
            <p>
              <strong>Project Team</strong>
            </p>
            <ul>
              {JSON.parse(serverData.projectteam)?.map((p) => (
                <li key={p.Name}>
                  <strong>{p.Name}</strong> {p.Title}
                </li>
              ))}
            </ul>
          </>
        ) : null}
        <div className="card" id="translation-request-card">
          <h2>Translation Request</h2>

          <p>
            DVRPC’s publications or portions of publications can be translated
            in alternative languages and formats if requested. To request
            translation, please submit the form below. You can also contact
            DVRPC’s Office of Communications & Engagement at 215-592-1800 or{" "}
            <a href="mailto:public_affairs@dvrpc.org">
              public_affairs@dvrpc.org
            </a>
            .
          </p>

          <form
            onSubmit={handleSubmit}
            action="https://www.dvrpc.org/asp/pubs/send.aspx"
            method="POST"
          >
            <input
              type="hidden"
              name="Product ID"
              defaultValue={serverData.id}
              id="productId"
            />
            <fieldset>
              <label htmlFor="First Name">First Name: </label>
              <input
                required
                className="form-control"
                type="text"
                name="First Name"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="Last Name">Last Name: </label>
              <input
                required
                className="form-control"
                type="text"
                name="Last Name"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="Format">
                In what format would you like to receive the translated
                document?
              </label>
              <select
                required
                className="form-control"
                name="Format"
                id="format"
              >
                <option>Electronic (emailed as a PDF)</option>
                <option value="hard copy">
                  Hard-copy (delivered through US mail)
                </option>
              </select>
            </fieldset>
            <fieldset>
              <label htmlFor="Preferred Contact">
                Preferred form of contact:
              </label>
              <select
                required
                className="form-control"
                name="Preferred Contact"
                id="preferred-contact"
              >
                <option default>Email</option>
                <option>Phone</option>
                <option>Mailing Address</option>
              </select>
            </fieldset>
            <fieldset id="mailing-address">
              <label htmlFor="Address 1">Address 1: </label>
              <input type="text" className="form-control" name="Address 1" />

              <label htmlFor="Address 2">Address 2: </label>
              <input type="text" className="form-control" name="Address 2" />

              <label htmlFor="City">City: </label>
              <input type="text" className="form-control" name="City" />

              <label htmlFor="State">State: </label>
              <input type="text" className="form-control" name="State" />

              <label htmlFor="Postal Code">Postal Code: </label>
              <input type="text" className="form-control" name="Postal Code" />
            </fieldset>
            <fieldset>
              <label htmlFor="Email">Email: </label>
              <input
                required
                className="form-control"
                type="email"
                name="Email"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="Phone">Phone: </label>
              <input
                required
                className="form-control"
                type="tel"
                name="Phone"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="Language">
                In what language or alternative format:
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="Language"
              />
            </fieldset>
            {isSubmitted ? (
              <p className="rounded-sm bg-green-300 px-4 py-2">
                <em>
                  Your request has been submitted to public_affairs@dvrpc.org.
                  Please check your email for confirmation.
                </em>
              </p>
            ) : (
              <button
                id="submit-translation-request"
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            )}
          </form>
        </div>
        <TitleVI />
      </Body>
      <StaffContact staffContact={userUser} title={title} location={location} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title: "Product Details",
    summary:
      "DVRPC has published over one thousand reports from the 1970s to present. Product abstracts and/or PDF downloads are available. You can also see a quick list of recent products published.",
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
    navItem(href: { regex: "/^/products/?$/i" }) {
      ...nestednavitem
    }
  }
`;

export default ProductDetailsPage;

export async function getServerData({ params, query }) {
  try {
    const res = await fetch(
      `https://apis.dvrpc.org/internal/dvrpc_products/products/product?id=${params.id}&key=${query.key}`
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
