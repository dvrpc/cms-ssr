import { Link } from "gatsby";
import React from "react";

const Announcement = (props) => (
  <div className="min-[1024px]:mb-[36px] h-40 md:mb-[22px] md:h-32 md:w-5/6">
    {!props.relationships && (
      <h4 className="m0 font-bold md:text-[20px] md:leading-[25px]">
        <a className="underline" href={props.path.alias}>
          {props.title}
        </a>
      </h4>
    )}
    <p className="md:text-[18px] md:leading-[22px]">{props.body?.processed}</p>
    {props.relationships && (
      <>
        <div className="flex">
          <img
            className="mr-[14px] h-16 w-16 border border-[#C2C2C2] object-cover p-[0.05rem] md:h-20 md:w-20"
            src={props.relationships.field_image.url}
          />
          <div className="mb-auto md:ml-2">
            <h4 className="m-0 text-[18px] font-bold leading-tight md:text-[20px] md:leading-[25px]">
              <a className="underline" href={props.path.alias}>
                {props.title}
              </a>
            </h4>
            <Link
              className="text-[18px] leading-[22px] underline"
              to={props.path.alias}
            >
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
