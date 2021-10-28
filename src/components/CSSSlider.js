/**
 * Credit: https://github.com/drygiel/csslider
 */

import React from "react";
import tw, { css } from "twin.macro";

const CSSSlider = ({ children = [], dimensions = tw`h-full w-full` }) => {
  return (
    <div
      tw="inline-block text-left relative mb-6"
      css={[...Array(children.length)].map(
        (_, i) => css`
          input:nth-of-type(${i + 1}):checked ~ ul li:first-of-type {
            margin-left: -${i}00%;
          }
          input:nth-of-type({i + 1}):checked
            ~ div
            label:nth-of-type({i + 1}):after {
            opacity: 1;
          }
          input:nth-of-type(${i + 1}):checked
            ~ aside
            > label:nth-of-type(${i}) {
            display: block;
            left: 0;
            right: auto;
            transform: rotate(45deg);
          }
          input:nth-of-type(${i + 1}):checked
            ~ aside
            > label:nth-of-type(${i + 2}) {
            display: block;
            right: 0;
            left: auto;
            transform: rotate(225deg);
          }
        `
      )}
    >
      {children.map((_, i) => (
        <input
          key={i}
          type="radio"
          name="slides"
          id={`slides_${i + 1}`}
          defaultChecked={i === 0 ? "checked" : null}
          tw="hidden"
        />
      ))}
      <ul
        css={[
          dimensions,
          css`
            font-size: 0;
            line-height: 0;
          `,
        ]}
        tw="relative z-10 my-0 mx-auto p-0 overflow-hidden whitespace-nowrap box-border"
      >
        {children.map((el, i) => (
          <li
            key={i}
            tw="relative inline-block w-full h-full overflow-hidden text-base leading-5 transition-all align-top box-border whitespace-normal"
          >
            {el}
          </li>
        ))}
      </ul>
      <aside tw="absolute z-0 top-1/2 -left-8 w-full h-4 px-8 box-content">
        {children.map((_, i) => (
          <label
            key={i}
            htmlFor={`slides_${i + 1}`}
            tw="hidden absolute -top-1/2 p-4 cursor-pointer transition-shadow before:(content absolute -top-full -left-full)"
            css={css`
              box-shadow: inset 5px -5px 0 1px #777;

              &:hover {
                box-shadow: inset 5px -5px 0 2px #666;
              }
            `}
          ></label>
        ))}
        <label htmlFor="slides_1" className="goto-first"></label>
        <label
          htmlFor={`slides_${children.length}`}
          className="goto-last"
        ></label>
      </aside>
      <div
        css={css`
          font-size: 0;
          line-height: 0;
        `}
        tw="absolute -bottom-2 left-1/2 z-20 mb-2.5 text-center select-none"
      >
        <div
          css={css`
            margin-left: -100%;
          `}
        >
          {children.map((_, i) => (
            <label
              key={i}
              htmlFor={`slides_${i + 1}`}
              tw="relative inline-block cursor-pointer mx-1 p-1 bg-gray-400 rounded-full hover:after:opacity-100 after:(content absolute left-1/2 top-1/2 -ml-1.5 -mt-1.5 bg-gray-400 rounded-full p-1.5 opacity-0)"
            ></label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSSSlider;
