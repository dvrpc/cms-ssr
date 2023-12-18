import React from "react";

export default function NewsRoomInfo() {
  return (
    <div className="w-full bg-[#EFF0F2] p-4 text-center md:text-left">
      <h3 className="!mt-0 text-lg font-bold tracking-wider">MEDIA</h3>
      <p className="font-bold md:my-2">Resources</p>
      <hr className="!m-0 hidden border-[#CDCDCD] md:block" />
      <p className="md:my-2">
        <a
          className="text-[#03688D] hover:underline"
          href="https://www.dvrpc.org/photosandlogos/pdf/dvrpc_logoguidelines.pdf"
        >
          DVRPC Logos and Guidelines
        </a>
        <br />
        <a
          className="text-[#03688D] hover:underline"
          href="https://www.dvrpc.org/photosandlogos/"
        >
          Executive Director and Headshots
        </a>
      </p>
      <div className="font-bold md:my-2">Contact</div>
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
  );
}
