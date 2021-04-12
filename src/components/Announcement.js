import React from "react";
import tw from "twin.macro";

const Announcement = (props) => (
  <div css={props.active ? tw`block` : tw`hidden`}>
    <h4 tw="m-0 font-bold text-lg">
      <a tw="underline" href={props.link}>
        {props.title}
      </a>
    </h4>
    <p tw="mt-2">{props.description}</p>
  </div>
);

const AnnouncementLoader = (props) => (
  <div tw="animate-pulse">
    <h4 tw="w-60 h-6 mb-4 pr-8 bg-gray-300" />
    <p tw="w-64 h-4 my-4 bg-gray-300" />
    <p tw="w-56 h-4 my-4 bg-gray-300" />
  </div>
);

export default Announcement;
export { AnnouncementLoader };
