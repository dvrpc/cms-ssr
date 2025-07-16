import React from "react";
import DVRPCbg from "../../images/dvrpc-transparent.png";
import bgImage from "../../images/datacenter-header.jpg";

const Banner = () => {
  return (
    <div
      className="h-fit-content relative flex w-full overflow-hidden text-white md:h-[calc(var(--height-banner)*1.6)] lg:h-[calc(var(--height-banner)*1.2)] xl:h-[var(--height-banner)]"
      style={{
        background: `url(${bgImage})`,
      }}
    >
      <div className="container mx-auto flex p-8">
        <form
          action="https://catalog.dvrpc.org/dataset/"
          method="GET"
          className="my-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
        >
          <h1 className="mt-0 text-5xl font-bold text-white">
            DVRPC Data Center
          </h1>
          <p>
            Data and information about the Greater Philadelphia region at your
            fingertips!
          </p>
          <input
            type="search"
            name="q"
            placeholder="Search datasets..."
            autoFocus
            className="mt-8 block w-full rounded-lg bg-[#c6dae9] p-2 text-xl leading-none text-[color:var(--color-body)] outline-none placeholder:text-left placeholder:text-lg placeholder:italic placeholder:tracking-wider  placeholder:text-slate-400"
          />
        </form>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 33.78 33.79"
        className="absolute -right-[40%] opacity-50 md:-right-[10%] md:-top-[30%] md:w-1/3"
      >
        <g id="Layer_1-2" data-name="Layer 1">
          <path
            fill="white"
            d="M23.68,1.44C15.15-2.32,5.19,1.55,1.43,10.08c-3.25,7.39-.82,16.04,5.8,20.65L23.68,1.44ZM2.4,23.02l1.42-.9c4.56-2.9,7.91-7.36,9.43-12.55.63-2.45.94-4.97.91-7.5v-1l.07.06s.4.55.29.4c.21.29.4.59.58.9.18.3.33.61.45.93.14.33.25.66.35,1,1.46,4.66.54,9.74-2.46,13.6-.87,1.06-1.88,2-3,2.78-1.79,1.18-3.83,1.94-5.95,2.24-.69.13-1.4.14-2.09.04Z"
          />
          <path
            class="cls-1"
            fill="white"
            d="M26.36,2.93l-16.48,29.33c8.48,3.87,18.49.14,22.37-8.34,3.43-7.5.94-16.37-5.89-20.99ZM20.46,23.93c-.75,2.55-1.16,5.18-1.22,7.84v1l-.07-.07c-.1-.14-.19-.28-.28-.43-.21-.32-.4-.66-.58-1-.16-.32-.31-.66-.43-1-.12-.34-.23-.68-.32-1-1.27-4.74-.24-10.51,3.07-14.19,2.4-2.82,5.8-4.61,9.49-5,.71-.11,1.42-.11,2.13,0l-1.5.9c-4.9,2.93-8.55,7.55-10.29,12.99v-.04Z"
          />
        </g>
      </svg>
    </div>
  );
};

export default Banner;
