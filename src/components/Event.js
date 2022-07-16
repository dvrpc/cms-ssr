import React from "react";

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.Title}
      className="flex w-full items-center gap-2 divide-x divide-blue-400 p-8 md:w-auto md:flex-1"
    >
      <footer className="flex flex-col items-center">
        <p className="m-0 text-2xl leading-none">
          {+mon}/{+day}
        </p>
        <span className="m-0 ml-auto">
          {props.StartTime !== "00:00" && start}
        </span>
      </footer>
      <h4 className="m-0 pl-2 font-normal">
        {props.Info ? (
          <a className="underline" href={props.Info}>
            {props.Title}
          </a>
        ) : (
          props.Title
        )}
      </h4>
    </div>
  );
};

const EventLoader = (props) => (
  <div className="flex w-72 animate-pulse items-center gap-2 divide-x divide-blue-400 p-8 md:w-auto md:flex-1">
    <footer className="flex flex-col items-center">
      <p className="h-8 w-10 bg-gray-200" />
      <span className="my-2 h-6 w-10 bg-gray-200" />
    </footer>
    <h4 className="m-0 h-20 w-48 bg-gray-200 pl-2" />
  </div>
);

export default Event;
export { EventLoader };
