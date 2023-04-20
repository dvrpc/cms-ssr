import React from "react";
import Body from "../../components/Body";
import Calendar from "../../components/Calendar";

const PartnerEventsPage = ({ serverData }) => {
  return (
    <>
      <Body title="Partner Events">
        <div className="my-4">
          DVRPC maintains a calendar of events, workshops, and conferences
          hosted by our partners and related to planning for Greater
          Philadelphia. To have your event added to this calendar, please email{" "}
          <a href="mailto:public_affairs@dvrpc.org">public_affairs@dvrpc.org</a>
          .
        </div>
        <Calendar header="Upcoming" data={serverData} />
      </Body>
    </>
  );
};

export default PartnerEventsPage;

export async function getServerData() {
  try {
    const res = await fetch(
      "https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?cal=partner"
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
