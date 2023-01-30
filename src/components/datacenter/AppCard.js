import React from 'react';

const AppCard = ({ node }) => {
  const { field_product_id: id, body, title, field_url: url } = node.entity[0];
  const len = 1000;
  const text = body
    ? body.processed.slice(0, len) + body.processed.slice(len).split(' ')[0]
    : '';
  return (
    <div
      className="flex break-inside-avoid flex-col bg-white p-[0.25em] text-lg md:min-w-[375px]"
      key={id}
    >
      <a href={url.uri}>
        <img
          className="h-[150px] w-full object-cover object-center"
          src={`https://www.dvrpc.org/asp/pubs/402px/${id}.png`}
        />
      </a>
      <div className="divide-y divide-[#53a3c7]">
        <h4 className="m-0 mb-[1rem] w-full px-2 text-[#0078ae]">
          <a className="no-underline hover:underline" href={url.uri}>
            {title}
          </a>
        </h4>
        {text && (
          <div
            className="px-2 text-base text-slate-400"
            dangerouslySetInnerHTML={{
              __html:
                text === body.processed
                  ? text.slice(0, 150) + '...'
                  : `${text}&hellip;`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default AppCard;
