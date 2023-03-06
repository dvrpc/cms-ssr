import React, { useState } from "react";

const genericHamburgerLine = `h-1 w-6 my-1 bg-[#0078ae] transition ease transform duration-300`;
const [mobileOpen, setMobileOpen] = useState(false);

const Hamburger = (mobileOpen, setMobileOpen) => {
  return (
    <button
      className="group z-50 flex h-12 w-12 flex-col items-center justify-center md:hidden"
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <div
        className={`${genericHamburgerLine} ${
          mobileOpen ? "translate-y-3 rotate-45 bg-white" : "bg-[#0078ae]"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          mobileOpen ? "bg-white opacity-0" : "bg-[#0078ae] opacity-100"
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          mobileOpen ? "-translate-y-3 -rotate-45 bg-white" : "bg-[#0078ae]"
        }`}
      />
    </button>
  );
};
export default Hamburger;
