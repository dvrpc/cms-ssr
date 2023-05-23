import React from "react";
import HtmlParser from "./HtmlParser";

const Product = (props) =>
  props.type === "card" ? (
    <div key={props.Id} className="my-4 flex w-full items-center gap-4 pr-6">
      <a
        className="shrink-0"
        href={`https://www.dvrpc.org/Products/${props.Id}`}
      >
        <img
          className="w-[100.5px] border border-solid border-gray-400 bg-white"
          src={`https://www.dvrpc.org/asp/pubs/201px/${props.Id}.png`}
          alt="cover"
        />
      </a>
      <h4 className="m-0 text-lg font-normal">
        <a
          className="no-underline"
          href={`https://www.dvrpc.org/Products/${props.Id}`}
        >
          {props.Title}
        </a>
      </h4>
    </div>
  ) : (
    <div
      key={props.Id}
      className="mb-4 flow-root space-y-1 border-b border-gray-200 pb-4"
    >
      <p className="mb-0 text-gray-700">
        {new Date(props.DateLive).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </p>
      <img
        src={`https://www.dvrpc.org/asp/pubs/402px/${props.Id}.png`}
        alt={props.Title}
        className="float-right m-4 mt-0 w-[201px] border border-gray-300"
      />
      <a
        href={`https://www.dvrpc.org/products/${props.Id}`}
        className="text-2xl text-[color:var(--color-h1)] no-underline"
      >
        <HtmlParser html={props.Title} />
      </a>
      <p>
        <HtmlParser html={props.Abstract} />
      </p>
      <p>
        <a
          className="font-bold text-[color:var(--color-h1)] no-underline hover:underline"
          href={`https://www.dvrpc.org/products/${props.Id}`}
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="ml-1 inline origin-top scale-75 fill-current"
          >
            <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 18-1-1 5-5-5-5 1-1 6 6-6 6z" />
          </svg>
        </a>
      </p>
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
