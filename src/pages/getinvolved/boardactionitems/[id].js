import React from "react";
import Body from "../../../components/Body";
import StaffContact from "../../../components/StaffContact";

const BoardActionItemDetailsPage = ({ serverData }) => {
  console.log(serverData);
  return (
    <>
      <Body title={serverData.Title}>
        <div dangerouslySetInnerHTML={{ __html: serverData.Details }} />
        <p className="underline">Recommendations:</p>
        <p>Regional Technical Committee - {serverData.Rtc}</p>
        <p>Staff - {serverData.Staff}</p>
        <p className="underline">Action Proposed:</p>
        <div dangerouslySetInnerHTML={{ __html: serverData.Action }}></div>
      </Body>
      <StaffContact />
    </>
  );
};

export default BoardActionItemDetailsPage;

export async function getServerData(context) {
  try {
    const res = await fetch(
      `https://www.dvrpc.org/api/actionitems/${context.params.id}`
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
