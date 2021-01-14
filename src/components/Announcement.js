import React from "react";
import tw from "twin.macro";

const Announcement = (props) => (
  <div
    key={props.guid["#text"]}
    tw="p-4 my-4 mx-2 md:flex-1 bg-white flex flex-col shadow border border-solid border-gray-100"
  >
    <h4 tw="m-0 font-bold text-lg">
      <a tw="underline" href={props.link}>
        {props.title}
      </a>
    </h4>
    <p tw="mt-4">{props.description}</p>
  </div>
);

export default Announcement;
