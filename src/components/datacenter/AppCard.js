import React from 'react';

const AppCard = ({ node }) => {
  const { field_product_id: id, body, title, field_url: url } = node.entity[0];
  const len = 1000;
  const text = body
    ? body.processed.slice(0, len) + body.processed.slice(len).split(' ')[0]
    : '';
  return (
    <div
      className="flex break-inside-avoid flex-col bg-white p-[0.25em] md:min-w-[375px]"
      key={id}
    >
      <a href={url.uri}>
        <img
          className="h-[150px] w-full object-cover object-center"
          src={`https://www.dvrpc.org/asp/pubs/402px/${id}.png`}
        />
      </a>
      <div className="divide-y divide-slate-300 px-2">
        <div className="min-h-[77px] mb-[1rem]">
          <h4 className="m-0 w-full pt-3 text-lg text-[#0078ae]">
            <a className="no-underline hover:underline" href={url.uri}>
              {title}
            </a>
          </h4>
        </div>
        {text && (
          <div
            className="text-base text-slate-400"
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
