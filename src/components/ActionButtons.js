import React from "react";
import Icon, { C2050 } from "./Icon";
import { Link } from "gatsby";

const ActionButtons = () => {
  return (
    <div className=" col-span-2 row-span-2 m-0 hidden gap-2 p-0 text-sm text-[#67abd1] md:flex md:items-center md:justify-end lg:col-span-1 lg:row-span-1 lg:items-end ">
      <a href="/plan">
        <Icon use={C2050} scale={null} className="mr-5 h-[48px]" />
      </a>
      <Link to="/planning">
        <button className="bg-[#0078ae] px-3 py-2 text-white hover:bg-[#0078ae]/90">
          Planning Assistance
        </button>
      </Link>
      <Link to="/getinvolved">
        <button className="bg-[#0078ae] px-3 py-2 text-white hover:bg-[#0078ae]/90">
          Get Involved
        </button>
      </Link>
    </div>
  );
};

export default ActionButtons;
