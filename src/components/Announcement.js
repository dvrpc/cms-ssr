import React from "react";

const Announcement = (props) => (
  <div className="h-40">
    <h4 className="m-0 font-bold text-lg">
      <a className="underline" href={props.link}>
        {props.title}
      </a>
    </h4>
    <p className="mt-2">{props.description}</p>
  </div>
);

const AnnouncementLoader = (props) => (
  <div className="animate-pulse h-40">
    <h4 className="w-60 h-6 mb-4 pr-8 bg-gray-300" />
    <p className="w-64 h-4 my-4 bg-gray-300" />
    <p className="w-56 h-4 my-4 bg-gray-300" />
  </div>
);

export default Announcement;
export { AnnouncementLoader };
