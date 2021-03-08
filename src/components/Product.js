import React from "react";
import tw from "twin.macro";

const Product = (props) => (
  <div key={props.PubId} tw="w-full md:w-1/2 my-4 flex items-center gap-4 pr-4">
    <img
      tw="border-solid border border-gray-400 bg-white"
      src={`https://www.dvrpc.org/asp/pubs/100px/${props.PubId}.png`}
      alt="cover"
    />
    <h4 tw="m-0 text-lg">
      <a tw="underline" href={`https://www.dvrpc.org/Products/${props.PubId}`}>
        {props.Title}
      </a>
    </h4>
  </div>
);

export default Product;
