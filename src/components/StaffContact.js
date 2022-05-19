import React from "react";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

const StaffContact = ({ staffContact, title, location }) => {
  return (
    <div className="bg-gray-300">
      <div className="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
        <div className="p-4 md:p-0 md:col-span-2 md:col-start-2 md:flex justify-between items-center max-w-[80ch]">
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

export default StaffContact;
