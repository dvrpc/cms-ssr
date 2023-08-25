import React from "react";

const months = [
  null,
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const Calendar = ({ data, header, location }) => {
  const currentMonth =
    location.pathname.length > 10 // "/calendar/"
      ? new Date(location.pathname.replace("/calendar/", ""))
      : new Date();
  const previousMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() - 1,
    1
  );
  const nextMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  );

  return (
    <>
      <div className="card">
        <h2>
          {!header
            ? currentMonth.toLocaleDateString("default", {
                month: "long",
                year: "numeric",
              })
            : header}
        </h2>
        <div className="divide-y">
          {data?.length === 0 ? (
            <div className="flex items-center space-x-4">
              <p className="w-full text-center">No events.</p>
            </div>
          ) : (
            data?.map((event) => {
              const [, mon, day] = event.StartDate.split("-");
              const [, endMon, endDay] = (event.EndDate ?? "").split("-");
              let [hr, min] = [null, null];
              if (event.StartTime) {
                [hr, min] = event.StartTime.split(":");
              }
              return (
                <div
                  key={event.Title + event.StartDate}
                  className="flex items-center space-x-4"
                >
                  <p className="min-w-max">
                    <strong className="text-xl">
                      {months[+mon]} {+day}
                    </strong>
                    {event.EndDate !== event.StartDate ? (
                      <strong className="text-xl">
                        &ndash;
                        <br />
                        {months[+endMon]} {+endDay}
                      </strong>
                    ) : (
                      event.StartTime && (
                        <span className="text-lg">
                          <br />
                          {+hr % 12 || hr}:{min}
                        </span>
                      )
                    )}
                  </p>
                  <p>
                    {event.Info ? (
                      <a
                        rel="noreferrer"
                        target="_blank"
                        className="underline"
                        href={event.Info}
                      >
                        {event.Title}
                      </a>
                    ) : (
                      event.Title
                    )}
                    {event.Location && (
                      <span className="italic text-gray-400">
                        <br />
                        {event.Location}
                      </span>
                    )}
                  </p>
                </div>
              );
            })
          )}
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
