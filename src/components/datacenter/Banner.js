import React from "react";
import DVRPCbg from "../../images/dvrpc-transparent.png";

const Banner = () => {
  return (
    <div
      className="relative flex h-[calc(var(--height-banner)*2.5)] md:h-[calc(var(--height-banner)*1.6)] lg:h-[calc(var(--height-banner)*1.2)] xl:h-[var(--height-banner)] w-full overflow-hidden after:absolute
          after:bottom-4 after:right-0 after:block after:bg-gradient-to-r 
          after:from-transparent after:via-white/80 after:to-white/80 after:p-1 
          after:px-2 after:pl-64 after:text-sm after:text-gray-900 after:content-[var(--content-photo-credits)]"
      style={{
        background: `linear-gradient(131deg, rgba(0, 120, 174, 1) 0%, rgba(92, 79, 146, 1) 68.5%, rgba(75, 66, 113, 1) 100%)`,
        color: "#fff",
      }}
    >
      <div className="container mx-auto flex p-8">
        <form
          action="https://catalog.dvrpc.org/dataset/"
          method="GET"
          className="my-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
        >
          <h1 className="text-white">DVRPC Data Center</h1>
          <p>
            data and information about the Greater Philadelphia region at your
            fingertips!
          </p>
          <input
            type="search"
            name="q"
            placeholder="Search datasets..."
            autoFocus
            className="mt-8 w-full rounded-lg bg-[#c6dae9] text-xl leading-none outline-none placeholder:italic placeholder:text-slate-400 placeholder:text-left placeholder:text-lg placeholder:tracking-wider  block"
          />
        </form>
      </div>
      <img
        className="absolute -right-[10%] -top-[45%] w-1/2"
        src={DVRPCbg}
      ></img>
    </div>
  );
};

export default Banner;
