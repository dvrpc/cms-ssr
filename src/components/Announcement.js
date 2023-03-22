import React from "react";

const Announcement = (props) => (
  <div className="h-40">
    <h4 className="m-0 text-lg font-bold">
      <a className="underline" href={props.Link}>
        {props.Title}
      </a>
    </h4>
    <p className="mt-2">{props.Description}</p>
  </div>
);

const AnnouncementLoader = () => (
  <div className="h-40 animate-pulse">
    <h4 className="mb-4 h-6 w-60 bg-gray-300 pr-8" />
    <p className="my-4 h-4 w-64 bg-gray-300" />
    <p className="my-4 h-4 w-56 bg-gray-300" />
  </div>
);

export default Announcement;
export { AnnouncementLoader };
