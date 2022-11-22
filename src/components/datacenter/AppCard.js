import React from "react";

const AppCard = ({ node }) => {
  const { field_product_id: id, body, title, field_url: url } = node.entity[0];
  const len = 1000;
  const text =
    body.processed.slice(0, len) + body.processed.slice(len).split(" ")[0];

  return (
    <div
      className="flex break-inside-avoid flex-col bg-white p-[0.25em] text-lg md:min-w-[375px]"
      key={id}
    >
      <a href={url.uri} className="h-[40%]">
        <img
          className="h-full w-full object-cover "
          src={`https://www.dvrpc.org/asp/pubs/402px/${id}.png`}
        />
      </a>
      <div className="divide-y p-4 pb-0">
        <h3 className="mt-0 w-full text-[#0078ae]">
          <a className="no-underline hover:underline" href={url.uri}>
            {title}
          </a>
        </h3>
        <div
          className="text-slate-400"
          dangerouslySetInnerHTML={{
            __html: text === body.processed ? text : `${text}&hellip;`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default AppCard;
