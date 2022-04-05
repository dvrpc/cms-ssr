import React from "react";

const Product = (props) => (
  <div
    key={props.PubId}
    className="w-full md:w-1/2 my-4 flex items-center gap-4 pr-4"
  >
    <img
      className="border-solid border border-gray-400 bg-white w-[100.5px]"
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
  <div className="w-full md:w-1/2 flex-1 my-4 flex items-center gap-4 pr-4">
    <div className="w-28 h-28 bg-gray-300" />
    <div>
      <h4 className="w-80 h-8 m-2 bg-gray-300" />
      <h4 className="w-64 h-8 m-2 bg-gray-300" />
    </div>
  </div>
);

export default Product;
export { ProductLoader };
