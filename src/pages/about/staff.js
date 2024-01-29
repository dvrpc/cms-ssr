import React from "react";
import { graphql } from "gatsby";

import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";
import HeadTemplate, {
  defaultThemeConfig,
  themeToCustomVars,
} from "../../components/HeadTemplate";

const title = "Staff List";

const StaffRow = ({ emp }) => {
  return (
    <li className="list-group-item print:!m-0 print:break-inside-avoid print:!border-0 print:!border-b print:!border-black print:!p-0">
      <a
        className="print:font-bold print:no-underline"
        href={`https://www.dvrpc.org/asp/email/?${emp.Id}`}
      >
        {[emp.Nickname ?? emp.FirstName, emp.LastName, emp.Suffix]
          .filter(Boolean)
          .join(" ")}
      </a>{" "}
      <span className="float-right ml-4 shrink-0">
        <span className="print:hidden">(215) 238-</span>
        {emp.Ext}
      </span>
      <span className="print:block print:text-xs">{emp.Title}</span>
    </li>
  );
};

const StaffListPage = ({ data, serverData, location }) => {
  const { userUser, navItem } = data;
  return (
    <>
      <Body title={title} menu={navItem}>
        <div className="print:columns-4 print:text-sm">
          <div className="print:hidden">
            <p>Contact information for staff.</p>
            <ul className="list-group">
              <li className="list-group-item">
                <a href="https://idnryib36jqh.objectstorage.us-ashburn-1.oci.customer-oci.com/p/CRSJ63CubnhBU9YppzcOZJuiALo2cVZsKVCBEEc_zt2UkPrQJaVId3Q5G2iQfiMB/n/idnryib36jqh/b/web-static-content/o/stafflist/dvrpcorgchart.pdf">
                  Current Organizational Chart
                </a>
              </li>
            </ul>
          </div>
          <h2 className="hidden print:m-0 print:block">
            {new Date().toLocaleDateString("en-us", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <ul className="list-group hidden print:block">
            <StaffRow emp={{ FirstName: "DVRPC", Ext: "215-592-1800" }} />
            <StaffRow
              emp={{ FirstName: "ACP Security", Ext: "215-351-2403" }}
            />
            <StaffRow
              emp={{ FirstName: "Garage Security", Ext: "215-351-2404" }}
            />
            <StaffRow emp={{ FirstName: "Admin Room", Ext: "2904" }} />
            <StaffRow emp={{ FirstName: "Bucks Room", Ext: "2909" }} />
            <StaffRow emp={{ FirstName: "Burlington Room", Ext: "2804" }} />
            <StaffRow emp={{ FirstName: "Camden Room", Ext: "2807" }} />
            <StaffRow emp={{ FirstName: "Chester Room", Ext: "2802" }} />
            <StaffRow emp={{ FirstName: "Delaware Room", Ext: "2801" }} />
            <StaffRow emp={{ FirstName: "Gloucester Room", Ext: "2806" }} />
            <StaffRow emp={{ FirstName: "Mercer Room", Ext: "2805" }} />
            <StaffRow emp={{ FirstName: "Montgomery Room", Ext: "2803" }} />
            <StaffRow emp={{ FirstName: "Philadelphia Room", Ext: "2808" }} />
            <StaffRow emp={{ FirstName: "Phone Room", Ext: "2928" }} />
          </ul>
          <h2 className="print:m-0">Directors</h2>
          <ul className="list-group">
            {serverData
              .filter((emp) => emp.Sortorder)
              .sort((a, b) => a.Sortorder - b.Sortorder)
              .map((emp) => (
                <StaffRow key={emp.Id} emp={emp} />
              ))}
          </ul>
          <h2 className="print:m-0 print:break-before-column">Staff</h2>
          <ul className="list-group">
            {serverData
              .filter((emp) => !emp.Sortorder)
              .map((emp) => (
                <StaffRow key={emp.Id} emp={emp} />
              ))}
          </ul>
        </div>
      </Body>
      <StaffContact staffContact={userUser} location={location} title={title} />
    </>
  );
};

export const Head = ({ data: { nodeTheme } }) =>
  HeadTemplate({
    title,
    summary: "Contact information for staff.",
    css: themeToCustomVars(nodeTheme, defaultThemeConfig),
  });

export const query = graphql`
  query {
    userUser(mail: { eq: "psmith@dvrpc.org" }) {
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
    navItem(href: { regex: "/about/staff/i" }) {
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

export default StaffListPage;

export async function getServerData() {
  try {
    const res = await fetch("https://www.dvrpc.org/api/staff");
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
