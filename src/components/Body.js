import React from "react";
import tw, { css } from "twin.macro";
import Main from "./Main";
import Menu from "./MenuJson";
import InfoLinks from "./InfoLinks";

const Body = ({ body, title, menu }) => {
  return (
    <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
      <div tw="md:order-2 md:col-span-2">
        <Main body={body} title={title} />
      </div>
      <div tw="md:order-1 md:col-span-1 md:mt-20 flex flex-col md:items-end">
        <Menu data={menu} />
        <InfoLinks />
      </div>
    </div>
  );
};

export default Body;
