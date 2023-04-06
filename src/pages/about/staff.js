import React from "react";

const StaffRow = ({ emp }) => {
  return (
    <div className="grid grid-cols-2">
      <span>
        <a
          className="underline"
          href={`https://www.dvrpc.org/asp/email/?${emp.Id}`}
        >
          {emp.FirstName} {emp.LastName} {emp.Suffix}
        </a>{" "}
        <span>{emp.Title}</span>
      </span>
      <span>(215) 238-{emp.Ext}</span>
    </div>
  );
};

const StaffListPage = ({ serverData }) => {
  return (
    <div>
      <h1>Staff List</h1>
      <p>Contact information for staff.</p>
      <a href="/" className="underline">
        Current Organizational Chart
      </a>
      <h1>Directors</h1>
      <div>
        {serverData
          .filter((emp) => emp.Sortorder)
          .map((emp) => (
            <StaffRow emp={emp} />
          ))}
      </div>
      <h1>Staff</h1>
      <div>
        {serverData
          .filter((emp) => !emp.Sortorder)
          .map((emp) => (
            <StaffRow emp={emp} />
          ))}
      </div>
    </div>
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
