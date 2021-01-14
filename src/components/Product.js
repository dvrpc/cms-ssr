import React from "react";
import tw from "twin.macro";

const Product = (props) => (
  <div
    key={props.PubId}
    tw="w-full md:w-auto p-4 my-4 mx-2 md:flex-1 bg-white shadow border border-solid border-gray-100"
  >
    <h4 tw="m-0 font-bold text-lg">
      <a tw="underline" href={`https://www.dvrpc.org/Products/${props.PubId}`}>
        {props.Title}
      </a>
    </h4>
    <img
      tw="float-right p-1 mt-5 ml-3 mb-1 border-solid border border-gray-400"
      src={`https://www.dvrpc.org/asp/pubs/100px/${props.PubId}.png`}
      alt="cover"
    />
    {props.Abstract && (
      <p tw="mt-4">
        {props.Abstract.slice(0, props.Abstract.indexOf(" ", 250))}
        {props.Abstract.length > 250 ? "…" : ""}
      </p>
    )}
  </div>
);

export default Product;
