import React, { useState } from "react";
import Async from "react-async";
import tw, { css } from "twin.macro";
import color from "color";
import fetchData, { initialData } from "../utils/fetchData";
import tailwindConfig from "../../tailwind.config.js";

const Infobar = ({ openedTab = null }) => {
  const [active, setActive] = useState(openedTab);

  return (
    <Async promiseFn={fetchData}>
      <Async.Loading>
        <aside>
          <div
            tw="flex justify-center"
            css={(props) => css`
              background-color: ${props.theme.bgPrimary};
              color: ${props.theme.infoColor};
            `}
          >
            <div tw="container flex-auto md:flex justify-between">
              {initialData.map(({ title }) => (
                <h2
                  css={[
                    tw`cursor-pointer no-underline flex-auto font-bold text-xl leading-none rounded-lg md:rounded-b-none px-4 py-3 my-2 mx-4 md:mb-0 flex justify-between items-center`,
                    (props) => css`
                      background-color: ${color(props.theme.bgPrimary)
                        .lighten(0.15)
                        .string()};
                    `,
                  ]}
                  key={title}
                >
                  <span>{title}</span>
                </h2>
              ))}
            </div>
          </div>
        </aside>
      </Async.Loading>
      <Async.Fulfilled>
        {(data) => (
          <aside>
            <div
              tw="flex justify-center"
              css={(props) => css`
                background-color: ${props.theme.bgPrimary};
                color: ${props.theme.infoColor};
              `}
            >
              <div tw="container flex-auto md:flex justify-between">
                {data.map(({ title, link }) => (
                  <h2
                    css={[
                      tw`cursor-pointer no-underline flex-auto font-bold text-xl leading-none rounded-lg md:rounded-b-none px-4 py-3 my-2 mx-4 md:mb-0 flex justify-between items-center`,
                      (props) => css`
                        background-color: ${color(props.theme.bgPrimary)
                          .lighten(0.15)
                          .string()};
                      `,
                    ]}
                    key={title}
                    onClick={(ev) => {
                      const selected = ev.target.innerText;
                      setActive(active === selected ? null : selected);
                    }}
                  >
                    <span>{title}</span>
                    {active === title ? (
                      <small>
                        <a href={link}>View More</a>
                      </small>
                    ) : (
                      <small
                        css={css`
                          visibility: hidden;
                        `}
                      >
                        <a>View More</a>
                      </small>
                    )}
                  </h2>
                ))}
              </div>
            </div>
            <div
              css={(props) =>
                css`
                  background-color: ${color(props.theme.bgPrimary)
                    .lighten(0.15)
                    .string()};
                `
              }
            >
              <div tw="flex flex-wrap mx-auto justify-center text-gray-900 max-w-screen-2xl">
                {data.map(
                  ({ title, key, components }) =>
                    active === title && (
                      <div
                        key={title}
                        css={[
                          tw`flex flex-wrap mx-4 mb-4`,
                          key === "twitter" && tw`items-start`,
                        ]}
                      >
                        {components}
                      </div>
                    )
                )}
              </div>
            </div>
          </aside>
        )}
      </Async.Fulfilled>
    </Async>
  );
};

export default Infobar;
