import React from "react";
import tw, { css } from "twin.macro";
import twitter from "twitter-text";

const Tweet = (props) => {
  const [, mon, date, time, , year] = props.created_at.split(" ");
  const [hour, min, sec] = time.split(":");
  const d = new Date(
    Date.UTC(
      year,
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ].indexOf(mon),
      date,
      hour,
      min,
      sec
    )
  );

  return (
    <article
      key={props.id_str}
      css={css`
        a {
          ${tw`no-underline hover:underline text-blue-600`}
        }
      `}
      tw="w-full md:w-auto md:flex-1 mx-4 my-4 p-4 bg-white flex flex-col shadow border border-solid border-gray-100"
    >
      <div tw="relative">
        {props.retweeted_status
          ? [
              <small tw="text-sm flex text-gray-500">
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
                {props.user.name} Retweeted
              </small>,

              <header tw="flex items-start">
                <a
                  href={`https://www.twitter.com/${props.retweeted_status.user.screen_name}`}
                  tw="no-underline mb-1 mr-4"
                >
                  <img
                    src={props.retweeted_status.user.profile_image_url_https}
                    tw="w-10 rounded-full"
                    alt="avatar"
                    width="40"
                    height="40"
                  />
                </a>
                <h4 tw="pb-2 m-0 mr-auto leading-none">
                  <a
                    href={`https://www.twitter.com/${props.retweeted_status.user.screen_name}`}
                    tw="no-underline hover:underline font-bold text-gray-900"
                  >
                    {props.retweeted_status.user.name}{" "}
                    {props.retweeted_status.user.verified && (
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
                  <small tw="font-normal text-gray-500">
                    @{props.retweeted_status.user.screen_name}
                  </small>
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#3ba9ee"
                  viewBox="0 0 335 276"
                  tw="w-5 flex-none absolute top-0 right-0"
                >
                  <path d="M302 70A195 195 0 013 245a142 142 0 0097-30 70 70 0 01-58-47 70 70 0 0031-2 70 70 0 01-57-66 70 70 0 0028 5 70 70 0 01-18-90 195 195 0 00141 72 67 67 0 01116-62 117 117 0 0043-17 65 65 0 01-31 38 117 117 0 0039-11 65 65 0 01-32 35" />
                </svg>
              </header>,
              <p
                tw="py-4 text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: twitter.autoLink(
                    props.retweeted_status.full_text,
                    props.retweeted_status.entities
                  ),
                }}
              />,
            ]
          : [
              <header tw="flex items-start">
                <a
                  href={`https://www.twitter.com/${props.user.screen_name}`}
                  tw="no-underline mb-1 mr-4"
                >
                  <img
                    src={props.user.profile_image_url_https}
                    tw="w-10 rounded-full"
                    alt="avatar"
                    height="40"
                    width="40"
                  />
                </a>
                <h4 tw="pb-2 m-0 mr-auto leading-none">
                  <a
                    href={`https://www.twitter.com/${props.user.screen_name}`}
                    tw="no-underline hover:underline font-bold text-gray-900"
                  >
                    {props.user.name}{" "}
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
                  <small tw="font-normal text-gray-500">
                    @{props.user.screen_name}
                  </small>
                </h4>
                {!props.embedded && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#3ba9ee"
                    viewBox="0 0 335 276"
                    tw="w-5 flex-none absolute top-0 right-0"
                  >
                    <path d="M302 70A195 195 0 013 245a142 142 0 0097-30 70 70 0 01-58-47 70 70 0 0031-2 70 70 0 01-57-66 70 70 0 0028 5 70 70 0 01-18-90 195 195 0 00141 72 67 67 0 01116-62 117 117 0 0043-17 65 65 0 01-31 38 117 117 0 0039-11 65 65 0 01-32 35" />
                  </svg>
                )}
              </header>,
              <p
                tw="py-4 text-gray-900"
                dangerouslySetInnerHTML={{
                  __html: twitter.autoLink(props.full_text, props.entities),
                }}
              />,
            ]}

        {props.extended_entities?.media?.length && (
          <a
            href={`https://www.twitter.com/${props.user.screen_name}/status/${props.id_str}`}
            rel="noopener"
            tw="block border border-solid border-gray-300 rounded-lg flex overflow-hidden h-40"
            css={css`
              div:first-of-type {
                ${tw`rounded-l-lg`}
              }

              div:last-of-type {
                ${tw`rounded-r-lg`}
              }
            `}
          >
            {props.extended_entities.media.map((media) => (
              <div
                key={media.media_url_https}
                tw="border-solid overflow-hidden bg-white"
                css={css`
                  width: ${(100 / props.extended_entities.media.length).toFixed(
                    2
                  )}%;
                `}
              >
                <img
                  alt="twitter image"
                  src={`${media.media_url_https}?name=small`}
                  tw="min-h-full max-w-full"
                />
              </div>
            ))}
          </a>
        )}
        {props.quoted_status && (
          <Tweet embedded={true} {...props.quoted_status} />
        )}
        <footer tw="text-sm mt-4 text-gray-500">
          {!props.embedded && (
            <a
              href={`https://www.twitter.com/${props.user.screen_name}/status/${props.id_str}`}
            >
              {d.toLocaleTimeString([], { timeStyle: "short" })} ·{" "}
              {d.toLocaleDateString([], { dateStyle: "medium" })}
            </a>
          )}
        </footer>
      </div>
    </article>
  );
};

export default Tweet;
