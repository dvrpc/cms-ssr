import React from "react";

export default function NewsRoomInfo() {
  return (
    <div className="w-full bg-[#EFF0F2] p-4 [&>*]:my-2">
      <h3 className="!mt-0 text-lg font-bold">MEDIA</h3>
      <p className="font-bold">Resources</p>
      <hr className="!m-0 border border-[#CDCDCD]" />
      <p>
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
      <p className="font-bold">Contact</p>
      <hr className="!m-0 border border-[#CDCDCD]" />
      <p className="my-2">
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
