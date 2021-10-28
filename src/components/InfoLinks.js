import React from "react";
import tw, { css } from "twin.macro";
import Icon from "./Icon";

const InfoLinks = () => {
  return (
    <aside
      css={css`
        border-top-width: 2px;
        border-image: linear-gradient(to left, #aaa, #fff) 1;
      `}
      tw="py-4"
    >
      <div tw="grid grid-flow-col auto-cols-fr">
        <a href="https://www.dvrpc.org/Calendar/" tw="block text-center">
          <Icon use="events" tw="mx-auto h-10" fillColor="#656565" />
          Events
        </a>
        <a href="https://www.dvrpc.org/News/" tw="block text-center">
          <Icon use="news" tw="mx-auto h-10" fillColor="#656565" />
          News
        </a>
        <a href="https://www.dvrpc.org/Data/" tw="block text-center">
          <Icon use="products" tw="mx-auto h-10" fillColor="#656565" />
          Releases
        </a>
      </div>
    </aside>
  );
};

export default InfoLinks;
