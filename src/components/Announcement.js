import { Link } from "gatsby";
import React from "react";

const Announcement = (props) => (
  <div className="h-32 md:w-3/5">
    {!props.relationships && (
      <h4 className="m0 text-lg font-bold">
        <a className="underline" href={props.Link}>
          {props.Title}
        </a>
      </h4>
    )}
    <p className="mt-2">{props.Description}</p>
    {props.relationships && (
      <>
        <div className="flex">
          <img
            className="h-20 w-20 border border-[#C2C2C2] object-cover p-[0.05rem]"
            src={props.relationships.field_image.url}
          />
          <div className="ml-2 mb-auto">
            <h4 className="m-0 text-lg font-bold">
              <a className="underline" href={props.Link}>
                {props.Title}
              </a>
            </h4>
            <Link className="underline" to={props.Link}>
              Read More
            </Link>
          </div>
        </div>
      </>
    )}
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
