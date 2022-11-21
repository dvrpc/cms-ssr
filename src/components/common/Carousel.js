import React from "react";
import { Leftarrow, Rightarrow } from "../Icon";

const Carousel = ({ children }) => {
  return (
    <div className="relative">
      <div className="absolute flex h-full w-full items-center">
        <div
          className="rounded-full bg-slate-100 p-4"
          onClick={() => {
            const scrollContainer = document.getElementById("scrollContainer");
            scrollContainer.scrollBy({
              behavior: "smooth",
              left: (screen.width / 2) * -1,
            });
          }}
          style={{ opacity: 0.85 }}
        >
          <div className="flex h-2 w-2 items-center">
            <Leftarrow />
          </div>
        </div>
        <div
          className="ml-auto rounded-full bg-slate-100 p-4"
          onClick={() => {
            const scrollContainer = document.getElementById("scrollContainer");
            scrollContainer.scrollBy({
              behavior: "smooth",
              left: screen.width / 2,
            });
          }}
          style={{ opacity: 0.85 }}
        >
          <div className="flex h-2 w-2 items-center">
            <Rightarrow />
          </div>
        </div>
      </div>
      <div
        id="scrollContainer"
        className="flex gap-4 overflow-hidden text-[#155575]"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
