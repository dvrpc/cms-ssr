import React from "react";
import tw from "twin.macro";

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.Title}
      tw="w-full md:w-auto md:flex-1 mx-4 my-4 p-4 bg-white flex flex-col shadow border border-solid border-gray-100"
    >
      <h4 tw="font-normal mt-0 mb-8">
        {props.Info ? (
          <a tw="underline" href={props.Info}>
            {props.Title}
          </a>
        ) : (
          props.Title
        )}
      </h4>
      <footer tw="flex mt-auto items-end">
        <p tw="m-0 text-3xl leading-none">
          {+mon}/{+day}
        </p>
        <b tw="m-0 ml-auto">{props.StartTime !== "00:00" && start}</b>
      </footer>
    </div>
  );
};

export default Event;
