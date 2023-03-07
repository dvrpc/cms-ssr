/**
 * Credit: https://github.com/drygiel/csslider
 */

import React from "react";

import "../styles/CSSSlider.css";

const CSSSlider = ({ children = [] }) => {
  return (
    <div className="relative mb-6 inline-block text-left">
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
      <ul className="relative z-10 my-0 mx-auto box-border h-full w-full overflow-hidden whitespace-nowrap p-0 text-[0] leading-none">
        {children.map((el, i) => (
          <li
            key={i}
            className="relative box-border inline-block h-full w-full overflow-hidden whitespace-normal align-top text-base leading-5 transition-all"
          >
            {el}
          </li>
        ))}
      </ul>
      <aside className="absolute top-[3.5rem] -left-8 z-0 box-content h-4 w-full px-8">
        {children.map((_, i) => (
          <label
            key={i}
            htmlFor={`slides_${i + 1}`}
            className="before:content absolute -top-1/2 hidden cursor-pointer p-3 shadow-inner transition-shadow before:absolute before:-top-full before:-left-full hover:shadow"
          ></label>
        ))}
        <label
          htmlFor="slides_1"
          className="before:content absolute -top-1/2 hidden cursor-pointer p-3 shadow-inner transition-shadow before:absolute before:-top-full before:-left-full hover:shadow"
        ></label>
        <label
          htmlFor={`slides_${children.length}`}
          className="before:content absolute -top-1/2 hidden cursor-pointer p-3 shadow-inner transition-shadow before:absolute before:-top-full before:-left-full hover:shadow"
        ></label>
      </aside>
      <div className="absolute -bottom-2 z-20 mb-2.5 select-none text-center text-[0] leading-none">
        <div className="-ml-full">
          {children.map((_, i) => (
            <label
              key={i}
              htmlFor={`slides_${i + 1}`}
              className="after:content relative mx-1 inline-block cursor-pointer rounded-full bg-gray-400 p-1 after:absolute after:left-1/2 after:top-1/2 after:-ml-1.5 after:-mt-1.5 after:rounded-full after:bg-gray-400 after:p-1.5 after:opacity-0 hover:after:opacity-100"
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSSSlider;
