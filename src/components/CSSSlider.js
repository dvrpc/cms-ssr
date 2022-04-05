/**
 * Credit: https://github.com/drygiel/csslider
 */

import React from "react";

import "../styles/CSSSlider.css";

const CSSSlider = ({ children = [] }) => {
  return (
    <div className="inline-block text-left relative mb-6">
      {children.map((_, i) => (
        <input
          key={i}
          type="radio"
          name="slides"
          id={`slides_${i + 1}`}
          defaultChecked={i === 0 ? "checked" : null}
          className="hidden"
        />
      ))}
      <ul className="relative z-10 my-0 mx-auto p-0 overflow-hidden whitespace-nowrap box-border text-[0] leading-none h-full w-full">
        {children.map((el, i) => (
          <li
            key={i}
            className="relative inline-block w-full h-full overflow-hidden text-base leading-5 transition-all align-top box-border whitespace-normal"
          >
            {el}
          </li>
        ))}
      </ul>
      <aside className="absolute z-0 top-1/2 -left-8 w-full h-4 px-8 box-content">
        {children.map((_, i) => (
          <label
            key={i}
            htmlFor={`slides_${i + 1}`}
            className="shadow-inner hover:shadow hidden absolute -top-1/2 p-4 cursor-pointer transition-shadow before:content before:absolute before:-top-full before:-left-full"
          ></label>
        ))}
        <label htmlFor="slides_1" className="shadow-inner hover:shadow hidden absolute -top-1/2 p-4 cursor-pointer transition-shadow before:content before:absolute before:-top-full before:-left-full"></label>
        <label
          htmlFor={`slides_${children.length}`}
          className="shadow-inner hover:shadow hidden absolute -top-1/2 p-4 cursor-pointer transition-shadow before:content before:absolute before:-top-full before:-left-full"
        ></label>
      </aside>
      <div className="absolute -bottom-2 left-1/2 z-20 mb-2.5 text-center select-none leading-none text-[0]">
        <div className="-ml-full">
          {children.map((_, i) => (
            <label
              key={i}
              htmlFor={`slides_${i + 1}`}
              className="relative inline-block cursor-pointer mx-1 p-1 bg-gray-400 rounded-full hover:after:opacity-100 after:content after:absolute after:left-1/2 after:top-1/2 after:-ml-1.5 after:-mt-1.5 after:bg-gray-400 after:rounded-full after:p-1.5 after:opacity-0"
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSSSlider;
