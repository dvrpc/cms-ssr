import React from "react";

const Product = (props) => (
  <div
    key={props.PubId}
    className="my-4 flex w-full items-center gap-4 pr-4 md:w-1/2"
  >
    <img
      className="w-[100.5px] border border-solid border-gray-400 bg-white"
      src={`https://www.dvrpc.org/asp/pubs/201px/${props.PubId}.png`}
      alt="cover"
    />
    <h4 className="m-0 text-lg">
      <a
        className="underline"
        href={`https://www.dvrpc.org/Products/${props.PubId}`}
      >
        {props.Title}
      </a>
    </h4>
  </div>
);

const ProductLoader = (props) => (
  <div className="my-4 flex w-full flex-1 items-center gap-4 pr-4 md:w-1/2">
    <div className="h-28 w-28 bg-gray-300" />
    <div>
      <h4 className="m-2 h-8 w-80 bg-gray-300" />
      <h4 className="m-2 h-8 w-64 bg-gray-300" />
    </div>
  </div>
);

export default Product;
export { ProductLoader };
