import React from "react";
import DVRPCbg from "../../images/dvrpc-transparent.png";

const Banner = () => {
  return (
    <div
      className="h-fit-content relative flex w-full overflow-hidden text-white md:h-[calc(var(--height-banner)*1.6)] lg:h-[calc(var(--height-banner)*1.2)] xl:h-[var(--height-banner)]"
      style={{
        background:
          "linear-gradient(131deg, rgba(0, 120, 174, 1) 0%, rgba(92, 79, 146, 1) 68.5%, rgba(75, 66, 113, 1) 100%)",
      }}
    >
      <div className="container mx-auto flex p-8">
        <form
          action="https://catalog.dvrpc.org/dataset/"
          method="GET"
          className="my-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
        >
          <h1 className="mt-0 text-4xl font-bold text-white">
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
      <img
        className="absolute -right-[40%] md:-right-[10%] md:-top-[30%] md:w-1/3"
        src={DVRPCbg}
      ></img>
    </div>
  );
};

export default Banner;
