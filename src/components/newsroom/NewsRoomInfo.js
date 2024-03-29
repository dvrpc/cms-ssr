import React from "react";

export default function NewsRoomInfo() {
  return (
    <>
      <div className="mb-4 w-full bg-[#E3E5E9] p-4 text-center md:bg-[#EFF0F2] md:text-left">
        <h3 className="!mt-0 text-lg font-bold tracking-wider">
          STAY UP TO DATE
        </h3>
        <hr className="!m-0 hidden border-[#CDCDCD] md:block" />
        <p className="md:my-2">
          <a
            className="text-[#03688D] hover:underline"
            href="https://signup.e2ma.net/signup/1808352/1403728/"
          >
            Sign up for our monthly newsletter
          </a>
        </p>
      </div>
      <div className="w-full bg-[#E3E5E9] p-4 text-center md:bg-[#EFF0F2] md:text-left">
        <h3 className="!mt-0 text-lg font-bold tracking-wider">MEDIA</h3>
        <p className="mt-2 font-medium md:my-1 md:mt-1">Resources</p>
        <hr className="!m-0 hidden border-[#CDCDCD] md:block" />
        <p className="md:my-2">
          <a
            className="text-[#03688D] hover:underline"
            href="https://www.dvrpc.org/photosandlogos/"
          >
            DVRPC Logos and Guidelines
          </a>
          <br />
          <a
            className="text-[#03688D] hover:underline"
            href="https://www.dvrpc.org/photosandlogos/#executivedirector"
          >
            Executive Director Bio & Headshots
          </a>
        </p>
        <div className="mt-2 font-medium md:my-2 md:mt-0">Contact</div>
        <hr className="!m-0 hidden border-[#CDCDCD] md:block" />
        <p className="md:my-2">
          Elise Turner:{" "}
          <a
            className="text-[#03688D] hover:underline"
            href="mailto:eturner@dvrpc.org"
          >
            eturner@dvrpc.org
          </a>
        </p>
      </div>
    </>
  );
}
