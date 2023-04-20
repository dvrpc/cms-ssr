import React from "react";

const Calendar = ({ data }) => {
  const renderedDate = new Date(data[0].StartDate);
  const previousMonth = new Date(
    renderedDate.getFullYear(),
    renderedDate.getMonth() - 1,
    1
  );
  const nextMonth = new Date(
    renderedDate.getFullYear(),
    renderedDate.getMonth() + 1,
    1
  );

  return (
    <>
      <div className="card">
        <h2>
          {renderedDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="divide-y">
          {data.map((event) => {
            const eventDate = new Date(event.StartDate + " " + event.StartTime);
            return (
              <div className="flex items-center space-x-4">
                <p className="text-center">
                  <strong className="text-xl">{eventDate.getDate()}</strong>
                  <br />
                  <span>
                    {eventDate.getHours()}:
                    {String(eventDate.getMinutes()).padStart(2, "0")}
                  </span>
                </p>
                <p>
                  <a className="underline" href={event.Info}>
                    {event.Title}
                  </a>
                  {event.Location && (
                    <>
                      <br />
                      <span className="italic text-gray-400">
                        {event.Location}
                      </span>
                    </>
                  )}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex w-full">
          <a
            href={`/calendar/${previousMonth.getFullYear()}/${
              previousMonth.getMonth() + 1
            }`}
          >
            ⟵ {previousMonth.toLocaleString("default", { month: "long" })}
          </a>
          <a
            className="ml-auto"
            href={`/calendar/${nextMonth.getFullYear()}/${
              nextMonth.getMonth() + 1
            }`}
          >
            {nextMonth.toLocaleString("default", { month: "long" })} ⟶
          </a>
        </div>
      </div>
    </>
  );
};

export default Calendar;
