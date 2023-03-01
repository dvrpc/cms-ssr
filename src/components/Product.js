import React from "react";

const Product = (props) => (
  <div key={props.PubId} className="my-4 flex w-full items-center gap-4 pr-4">
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
  <div className="my-4 grid w-full grid-cols-[100.5px_1fr] gap-4 pr-12">
    <div className="h-[100.5px] w-[100.5px] bg-gray-300" />
    <div className="w-full">
      <div className="m-2 h-8 w-full bg-gray-300" />
      <div className="m-2 mr-12 h-8 bg-gray-300" />
    </div>
  </div>
);

export default Product;
export { ProductLoader };
