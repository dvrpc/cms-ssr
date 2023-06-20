import React from "react";

const Event = ({ StartDate, StartTime, Title, Info }) => {
  StartTime = StartTime ?? "00:00";
  const [, mon, day] = StartDate.split("-");
  const hour = +StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + StartTime.substring(2);
  return (
    <div
      key={StartDate + Title}
      className="-ml-4 flex w-full items-center gap-4 divide-x divide-gray-400 px-4 pt-0 pb-8 md:w-auto md:flex-1"
    >
      <footer className="flex flex-col items-center">
        <p className="m-0 text-2xl leading-none">
          {+mon}/{+day}
        </p>
        <span className="m-0 ml-auto">{StartTime !== "00:00" && start}</span>
      </footer>
      <h4 className="m-0 pl-2 font-normal">
        {Info ? (
          <a className="underline" href={Info}>
            {Title}
          </a>
        ) : (
          Title
        )}
      </h4>
    </div>
  );
};

const EventLoader = (props) => (
  <div className="items-top flex w-72 animate-pulse gap-2 divide-x divide-gray-400 md:w-auto md:flex-1">
    <footer className="flex flex-col items-center">
      <span className="h-8 w-10 bg-gray-200" />
      <span className="my-2 h-6 w-10 bg-gray-200" />
    </footer>
    <span className="m-0 h-16 w-48 bg-gray-200 pl-2" />
  </div>
);

export default Event;
export { EventLoader };
