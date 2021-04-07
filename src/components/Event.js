import React from "react";
import tw from "twin.macro";

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.Title}
      tw="w-full md:w-auto md:flex-1 p-8 flex items-center gap-2 divide-x divide-blue-400"
    >
      <footer tw="flex flex-col items-center">
        <p tw="m-0 text-2xl leading-none">
          {+mon}/{+day}
        </p>
        <span tw="m-0 ml-auto">{props.StartTime !== "00:00" && start}</span>
      </footer>
      <h4 tw="font-normal m-0 pl-2">
        {props.Info ? (
          <a tw="underline" href={props.Info}>
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
  <div tw="w-72 md:w-auto md:flex-1 p-8 flex items-center gap-2 divide-x divide-blue-400 animate-pulse">
    <footer tw="flex flex-col items-center">
      <p tw="h-8 w-10 bg-gray-200" />
      <span tw="h-6 my-2 w-10 bg-gray-200" />
    </footer>
    <h4 tw="w-48 h-20 m-0 pl-2 bg-gray-200" />
  </div>
);

export default Event;
export { EventLoader };
