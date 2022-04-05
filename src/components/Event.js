import React from "react";

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.Title}
      className="w-full md:w-auto md:flex-1 p-8 flex items-center gap-2 divide-x divide-blue-400"
    >
      <footer className="flex flex-col items-center">
        <p className="m-0 text-2xl leading-none">
          {+mon}/{+day}
        </p>
        <span className="m-0 ml-auto">
          {props.StartTime !== "00:00" && start}
        </span>
      </footer>
      <h4 className="font-normal m-0 pl-2">
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
  <div className="w-72 md:w-auto md:flex-1 p-8 flex items-center gap-2 divide-x divide-blue-400 animate-pulse">
    <footer className="flex flex-col items-center">
      <p className="h-8 w-10 bg-gray-200" />
      <span className="h-6 my-2 w-10 bg-gray-200" />
    </footer>
    <h4 className="w-48 h-20 m-0 pl-2 bg-gray-200" />
  </div>
);

export default Event;
export { EventLoader };
