import React, { useEffect, useState } from "react";

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

const StaffListPage = () => {
  const [staff, setStaff] = useState([]);
  useEffect(() => {
    (async () => {
      const req = await fetch("https://www.dvrpc.org/api/staff");
      const res = await req.json();
      setStaff(res);
    })();
  }, [setStaff]);

  return (
    <div>
      <h1>Staff List</h1>
      <p>Contact information for staff.</p>
      <a href="/" className="underline">
        Current Organizational Chart
      </a>
      <h1>Directors</h1>
      <div>
        {staff
          .filter((emp) => emp.Sortorder)
          .map((emp) => (
            <StaffRow emp={emp} />
          ))}
      </div>
      <h1>Staff</h1>
      <div>
        {staff
          .filter((emp) => !emp.Sortorder)
          .map((emp) => (
            <StaffRow emp={emp} />
          ))}
      </div>
    </div>
  );
};

export default StaffListPage;
