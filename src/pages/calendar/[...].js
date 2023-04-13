import React from "react";
import Calendar from "../../components/Calendar";
import StaffContact from "../../components/StaffContact";

const CalendarPage = ({ serverData }) => {
  return (
    <>
      <Calendar data={serverData} />
      <StaffContact />
    </>
  );
};

export default CalendarPage;

export async function getServerData(context) {
  const today = new Date(context.params["*"]);
  const firstDay = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).toLocaleDateString();
  const lastDay = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    1
  ).toLocaleDateString();

  try {
    const res = await fetch(
      `https://www.dvrpc.org/asp/homepage/getCalendarItems.aspx?timemin=${firstDay}&timemax=${lastDay}`
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
