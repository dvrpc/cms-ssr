import React from "react";
import tw, { css } from "twin.macro";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

export default StaffContact = ({ staffContact, title, location }) => {
  return (
    <div tw="bg-gray-300">
      <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
        <div tw="md:col-span-2 md:col-start-2 px-4 md:flex justify-between items-center">
          <Avatar contact={staffContact} />
          <ConnectWithUs
            title={title}
            location={`https://www.dvrpc.org${location}`}
          />
        </div>
      </div>
    </div>
  );
};
