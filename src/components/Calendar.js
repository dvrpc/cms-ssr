import React from "react";

const Calendar = ({ data, header }) => {
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
          {!header
            ? renderedDate.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })
            : header}
        </h2>
        <div className="divide-y">
          {data.map((event) => {
            const eventDate = new Date(event.StartDate);
            if (event.StartTime) {
              const hoursMinutes = event.StartTime.split(":");
              eventDate.setHours(hoursMinutes[0], hoursMinutes[1]);
            }
            return (
              <div className="flex items-center space-x-4">
                <p className="text-center">
                  <strong className="text-xl">
                    {!header
                      ? eventDate.getDate()
                      : eventDate
                          .toLocaleDateString("default", {
                            month: "short",
                            day: "numeric",
                          })
                          .toUpperCase()}
                  </strong>
                  <br />
                  {event.StartTime && (
                    <span>
                      {eventDate.getHours() % 12}:
                      {String(eventDate.getMinutes()).padStart(2, "0")}
                    </span>
                  )}
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
        {!header && (
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
        )}
      </div>
    </>
  );
};

export default Calendar;
