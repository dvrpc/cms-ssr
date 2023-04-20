import React from "react";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const StaffRow = ({ emp }) => {
  return (
    <li className="list-group-item !flex">
      <span className="max-w-[75%]">
        <a
          className="underline"
          href={`https://www.dvrpc.org/asp/email/?${emp.Id}`}
        >
          {emp.FirstName} {emp.LastName} {emp.Suffix}
        </a>{" "}
        <span>{emp.Title}</span>
      </span>
      <span className="ml-auto">(215) 238-{emp.Ext}</span>
    </li>
  );
};

const StaffListPage = ({ serverData }) => {
  return (
    <>
      <Body title="Staff List">
        <div className="mt-4">Contact information for staff.</div>
        <ul className="list-group">
          <li className="list-group-item">
            <a href="/" className="underline">
              Current Organizational Chart
            </a>
          </li>
        </ul>
        <h2>Directors</h2>
        <ul className="list-group">
          {serverData
            .filter((emp) => emp.Sortorder)
            .map((emp) => (
              <StaffRow emp={emp} />
            ))}
        </ul>
        <h2>Staff</h2>
        <ul className="list-group">
          {serverData
            .filter((emp) => !emp.Sortorder)
            .map((emp) => (
              <StaffRow emp={emp} />
            ))}
        </ul>
      </Body>
      <StaffContact />
    </>
  );
};

export default StaffListPage;

export async function getServerData() {
  try {
    const res = await fetch(`https://www.dvrpc.org/api/staff`);
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
