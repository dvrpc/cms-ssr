import React from "react";
import SocialMedia from "./SocialMedia";

const MobileFooter = () => {
  return (
    <div className="md:hidden flex justify-center bg-[#383838] text-white fixed bottom-0 w-screen">
      <SocialMedia fill="#666666" />
    </div>
  );
};

export default MobileFooter;
