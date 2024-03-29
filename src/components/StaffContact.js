import React from "react";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

const StaffContact = ({ staffContact, title, location }) => {
  return (
    <div className="bg-gray-300 print:hidden">
      <div className="container mx-auto grid gap-12 sm:grid-cols-1 md:grid-cols-3">
        <div className="max-w-[80ch] items-center justify-between p-4 md:col-span-2 md:col-start-2 md:flex md:p-0">
          <Avatar {...staffContact} />
          {location && (
            <ConnectWithUs
              title={title}
              location={`https://www.dvrpc.org${location}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffContact;
