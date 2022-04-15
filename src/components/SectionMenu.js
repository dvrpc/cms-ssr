import React from "react";
import Icon, { Events, Products } from "./Icon";

const SectionMenu = () => {
  return (
    <div className="grid grid-cols-4 text-white divide-x divide-gray-400">
      <div className="h-100 px-2 flex flex-col items-center justify-center">
        <Icon
          use={Events}
          fillColor="#ffffff"
          scale={null}
          className="h-[50px]"
        />
        <a href="/#events-section" className="cursor-pointer">
          Events
        </a>
      </div>
      <div className="h-100 px-2 flex flex-col items-center justify-center">
        <Icon
          use={Products}
          fillColor="#ffffff"
          scale={null}
          className="h-[50px]"
        />
        <a href="/#releases-section" className="cursor-pointer">
          Releases
        </a>
      </div>
      <div className="h-100 px-2 flex flex-col items-center justify-center">
        <Icon
          use={Events}
          fillColor="#ffffff"
          scale={null}
          className="h-[50px]"
        />
        <a href="/#links-section" className="cursor-pointer">
          Links
        </a>
      </div>
      <div className="h-100 px-2 flex flex-col items-center justify-center">
        <Icon
          use={Events}
          fillColor="#ffffff"
          scale={null}
          className="h-[50px]"
        />
        <a href="/#featured-section" className="cursor-pointer">
          Featured
        </a>
      </div>
    </div>
  );
};

export default SectionMenu;
