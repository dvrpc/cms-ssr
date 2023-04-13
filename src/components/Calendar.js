import React from "react";
import Body from "./Body";

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
    <Body title="Calendar">
      <div>
        The DVRPC Meeting Calendar is updated on a frequent basis with all
        internal and external DVRPC sponsored events. DVRPC does not permit
        external videotaping, audiotaping, or recording at its committee
        meetings. External taping is permitted at DVRPC's Board meeting when it
        is held in person; please inform staff of your intention to do so.
        Please note, since DVRPC is holding its committee meetings, including
        Board meetings, remotely via Zoom, staff may record the meeting to take
        meeting minutes, to share meeting content with committee members or
        members of the public, for educational purposes, or for other reasons
        not listed here. By continuing to stay on the remote meeting or entering
        a meeting already in progress, the attendee consents to be recorded.
      </div>
      <div>
        <h2>
          {renderedDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        {data.map((event) => (
          <>
            <p>
              <a className="underline" href={event.Info}>
                {event.Title}
              </a>
              {event.Location && (
                <>
                  <br />
                  <span className="italic text-gray-400">{event.Location}</span>
                </>
              )}
            </p>
          </>
        ))}
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
    </Body>
  );
};

export default Calendar;
