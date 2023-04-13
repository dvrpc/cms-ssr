import React from "react";
import Body from "../components/Body";
import StaffContact from "../components/StaffContact";

const BoardDetails = ({ committee }) => {
  return (
    <details>
      <summary className="mb-1 cursor-pointer rounded-sm border-2 border-l-black bg-[#eeeeee] p-2 text-left shadow-sm outline-none">
        {committee.Name}
      </summary>
      {committee.Members.filter((member) => member.Name).map((member) => {
        const { Id, Order, OrgId, Type, ...rest } = member;
        return (
          <div>
            <div className="font-bold">{member.Name}</div>
            <div>{member.Title}</div>
            <div>
              {member.Street}{" "}
              {member.Street2 && (
                <>
                  <br />
                  {member.Street2}
                </>
              )}
            </div>
            <div>
              {member.City}, {member.State} {member.Zip}
            </div>
            {member.Phone && <div>Phone: {member.Phone}</div>}
            {member.Email && (
              <a className="underline" href={`mailto:${member.Email}`}>
                {member.Email}
              </a>
            )}
          </div>
        );
      })}
    </details>
  );
};

const BoardListPage = ({ serverData }) => {
  const { Board, Officers } = serverData;

  return (
    <>
      <Body title="DVRPC Board">
        <div>
          <p>
            The Board is an 18-member body having the authority and
            responsibility to make decisions affecting the entire organization
            as well as the nine-county region. It creates and defines the duties
            of the Office of the Executive Director and the various DVRPC
            committees; and approves and adopts the annual planning work
            program. In its capacity as the Metropolitan Planning Organization
            (MPO) for the region, the Board establishes regional transportation
            policies, determines allocation of available transportation funds
            and prioritizes transportation projects for the region. In addition
            to transportation planning for highways, transit, airports and
            freight, the agency develops plans and policies for other regional
            physical planning elements such as land use, air quality, housing,
            water supply and water quality.{" "}
          </p>
          <h2>Officers:</h2>
          {Officers.map((officer) => {
            return (
              <>
                <strong>{officer.Title}:</strong> <span>{officer.Name}</span>
                <br />
              </>
            );
          })}
          <h2>Board Members and Alternates</h2>
          {Board.map((committee) => (
            <BoardDetails committee={committee} />
          ))}
        </div>
      </Body>
      <StaffContact />
    </>
  );
};

export default BoardListPage;

export async function getServerData() {
  try {
    const res = await fetch(`https://www.dvrpc.org/api/board`);
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
