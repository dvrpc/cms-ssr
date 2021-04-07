import React from "react";
import tw, { css } from "twin.macro";

const Product = (props) => (
  <div key={props.PubId} tw="w-full md:w-1/2 my-4 flex items-center gap-4 pr-4">
    <img
      css={css`
        width: 100.5px;
      `}
      tw="border-solid border border-gray-400 bg-white"
      src={`https://www.dvrpc.org/asp/pubs/201px/${props.PubId}.png`}
      alt="cover"
    />
    <h4 tw="m-0 text-lg">
      <a tw="underline" href={`https://www.dvrpc.org/Products/${props.PubId}`}>
        {props.Title}
      </a>
    </h4>
  </div>
);

const ProductLoader = (props) => (
  <div tw="w-full md:w-1/2 flex-1 my-4 flex items-center gap-4 pr-4">
    <div tw="w-28 h-28 bg-gray-300" />
    <div>
      <h4 tw="w-80 h-8 m-2 bg-gray-300" />
      <h4 tw="w-64 h-8 m-2 bg-gray-300" />
    </div>
  </div>
);

export default Product;
export { ProductLoader };
