import React from "react";

const Calendar = ({ data, header }) => {
  const renderedDate = data.length
    ? new Date(data[0].StartDate)
    : new Date(location.pathname.replace("/calendar/", ""));
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
          {data.length === 0 ? (
            <div className="flex items-center space-x-4">
              <p className="w-full text-center">No events.</p>
            </div>
          ) : (
            data.map((event) => {
              const eventDate = new Date(event.StartDate);
              if (event.StartTime) {
                const hoursMinutes = event.StartTime.split(":");
                eventDate.setHours(hoursMinutes[0], hoursMinutes[1]);
              }
              return (
                <div
                  key={event.Title + event.StartDate}
                  className="flex items-center space-x-4"
                >
                  <p className="min-w-max">
                    <strong className="text-xl">
                      {eventDate
                        .toLocaleDateString("default", {
                          month: "short",
                          day: "numeric",
                        })
                        .toUpperCase()}
                    </strong>
                    <br />
                    {event.StartTime && (
                      <span className="text-lg">
                        {eventDate.getHours() % 12 || eventDate.getHours()}:
                        {eventDate.getMinutes().toString().padStart(2, 0)}
                      </span>
                    )}
                  </p>
                  <p>
                    {event.Info ? (
                      <a className="underline" href={event.Info}>
                        {event.Title}
                      </a>
                    ) : (
                      event.Title
                    )}
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
