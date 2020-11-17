import React, { useState, useEffect } from "react";
import Async from "react-async";
import tw, { css } from "twin.macro";
import color from "color";

const Announcement = (props) => (
  <div
    key={props.guid["#text"]}
    tw="p-4 my-4 mx-2 flex-1 bg-white flex flex-col shadow border border-solid border-gray-100"
  >
    <h4 tw="m-0 font-bold text-lg">
      <a tw="underline" href={props.link}>
        {props.title}
      </a>
    </h4>
    <p tw="mt-4">{props.description}</p>
  </div>
);

const Product = (props) => (
  <div
    key={props.PubId}
    tw="p-4 my-4 mx-2 flex-1 bg-white shadow border border-solid border-gray-100"
  >
    <h4 tw="m-0 font-bold text-lg">
      <a tw="underline" href={`https://www.dvrpc.org/Products/${props.PubId}`}>
        {props.Title}
      </a>
    </h4>
    <img
      tw="float-right p-1 mt-5 ml-2 mb-1 border-solid border border-gray-400"
      src={`https://www.dvrpc.org/asp/pubs/100px/${props.PubId}.png`}
      alt="cover"
    />
    <p tw="mt-4">
      {props.Abstract.slice(0, props.Abstract.indexOf(" ", 250))}
      {props.Abstract.length > 250 ? "…" : ""}
    </p>
  </div>
);

const Event = (props) => {
  const [, mon, day] = props.StartDate.split("-");
  const hour = +props.StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + props.StartTime.substring(2);
  return (
    <div
      key={props.StartDate + props.Title}
      tw="flex-1 mx-4 my-4 p-4 bg-white flex flex-col shadow border border-solid border-gray-100"
    >
      <h4 tw="font-normal mt-0 mb-8">
        {props.Info ? (
          <a tw="underline" href={props.Info}>
            {props.Title}
          </a>
        ) : (
          props.Title
        )}
      </h4>
      <footer tw="flex mt-auto items-end">
        <p tw="m-0 text-3xl leading-none">
          {+mon}/{+day}
        </p>
        <b tw="m-0 ml-auto">{props.StartTime !== "00:00" && start}</b>
      </footer>
    </div>
  );
};

const Tweet = (props) => {
  return (
    <div
      key={props.id}
      tw="p-4 my-4 mx-2 flex-1 bg-white flex flex-col shadow border border-solid border-gray-100"
    >
      <div tw="relative">
        {props.retweet && (
          <small tw="text-gray-500 text-sm flex">
            <div tw="ml-2 w-10 mr-2 text-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#a0aec0"
                viewBox="0 0 24 24"
                tw="inline-block w-3 flex-none align-baseline"
              >
                <path d="M23.615 15.477c-.47-.47-1.23-.47-1.697 0l-1.326 1.326V7.4a3.955 3.955 0 00-3.95-3.95h-5.2a1.2 1.2 0 000 2.4h5.2c.854 0 1.55.695 1.55 1.55v9.403l-1.326-1.326a1.2 1.2 0 00-1.697 1.697l3.374 3.375a1.202 1.202 0 001.698 0l3.375-3.376c.467-.47.467-1.23-.002-1.697zM12.562 18.5h-5.2c-.854 0-1.55-.695-1.55-1.55V7.547l1.326 1.326a1.202 1.202 0 001.698-1.697L5.46 3.8a1.201 1.201 0 00-1.697 0L.388 7.177a1.2 1.2 0 001.697 1.697L3.41 7.547v9.403a3.955 3.955 0 003.95 3.95h5.2a1.2 1.2 0 00.002-2.4z" />
              </svg>
            </div>
            DVRPC Retweeted
          </small>
        )}
        <header tw="flex items-start">
          <a
            href={`https://www.twitter.com/${props.screen_name}`}
            tw="no-underline mb-1 mr-4"
          >
            <img src={props.avatar} tw="w-10 rounded-full" alt="avatar" />
          </a>
          <h4 tw="pb-2 m-0 mr-auto leading-none">
            <a
              href={`https://www.twitter.com/${props.screen_name}`}
              tw="no-underline"
            >
              {props.name}{" "}
              {props.verified && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#3ba9ee"
                  viewBox="0 0 24 24"
                  tw="inline-block w-4 align-top"
                >
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25a3.606 3.606 0 00-1.336-.25c-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5a.749.749 0 01-1.041.208l-.115-.094-2.415-2.415a.749.749 0 111.06-1.06l1.77 1.767 3.825-5.74a.75.75 0 011.25.833z" />
                </svg>
              )}
            </a>
            <br />
            <small tw="text-gray-500 font-normal">@{props.screen_name}</small>
          </h4>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#3ba9ee"
            viewBox="0 0 335 276"
            tw="w-5 flex-none absolute top-0 right-0"
          >
            <path d="M302 70A195 195 0 013 245a142 142 0 0097-30 70 70 0 01-58-47 70 70 0 0031-2 70 70 0 01-57-66 70 70 0 0028 5 70 70 0 01-18-90 195 195 0 00141 72 67 67 0 01116-62 117 117 0 0043-17 65 65 0 01-31 38 117 117 0 0039-11 65 65 0 01-32 35" />
          </svg>
        </header>
        <p tw="pb-4" dangerouslySetInnerHTML={{ __html: props.text }} />
        {props.img && props.img.length && (
          <a
            href={`https://www.twitter.com/${props.screen_name}/status/${props.id}`}
            rel="noopener"
            tw="block"
          >
            <img
              tw="max-w-full border border-solid border-gray-300 rounded-lg"
              alt="twitter image"
              src={props.img}
            />
          </a>
        )}
        <footer tw="mt-auto pt-2 flex justify-between text-gray-700 text-sm">
          <a
            tw="underline"
            href={`https://www.twitter.com/${props.screen_name}/status/${props.id}`}
            rel="noopener"
          >
            View on Twitter
          </a>
          <span>{props.date}</span>
        </footer>
      </div>
    </div>
  );
};

const Infobar = () => {
  const tabs = [
    { title: "Announcements", key: "anns", render: Announcement },
    { title: "Products", key: "pubs", render: Product },
    { title: "Events", key: "events", render: Event },
    { title: "Twitter", key: "twitter", render: Tweet },
  ];
  const [active, setActive] = useState(null);

  return (
    <aside>
      <div
        css={[
          tw`flex justify-center text-gray-900`,
          (props) => css`
            background-color: ${props.theme.bgPrimary};
          `,
        ]}
      >
        <div tw="container flex-auto md:flex justify-between">
          {tabs.map(({ title }) => (
            <h2
              css={[
                tw`cursor-pointer no-underline flex-auto font-bold text-xl leading-none rounded-lg md:rounded-b-none px-4 py-3 my-2 mx-4 md:mb-0`,
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
              {title}
            </h2>
          ))}
        </div>
      </div>
      <div
        css={[
          tw`flex flex-wrap justify-center text-gray-900`,
          (props) =>
            css`
              background-color: ${color(props.theme.bgPrimary)
                .lighten(0.15)
                .string()};
            `,
        ]}
      >
        <Async.Fulfilled>
          {(state) =>
            tabs.map(
              ({ title, key, render }) =>
                active === title && (
                  <div
                    key={title}
                    css={[
                      tw`flex flex-wrap mx-4 mb-4`,
                      key === "twitter" && tw`items-start`,
                    ]}
                  >
                    {state[key]?.map(render)}
                  </div>
                )
            )
          }
        </Async.Fulfilled>
      </div>
    </aside>
  );
};

export default Infobar;
