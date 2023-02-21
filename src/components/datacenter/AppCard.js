import React from 'react';

const AppCard = ({ node }) => {
  const { field_product_id: id, body, title, field_url: url } = node.entity[0];
  const len = 1000;
  const text = body
    ? body.processed.slice(0, len) + body.processed.slice(len).split(' ')[0]
    : '';
  return (
    <div
      className="flex break-inside-avoid flex-col bg-white p-[0.25em] md:min-w-[375px] min-w-fit mx-2"
      key={id}
    >
      <a href={url.uri}>
        <div className="relative overflow-hidden">
          <img
            className="h-[150px] w-full object-cover object-center"
            src={`https://www.dvrpc.org/asp/pubs/402px/${id}.png`}
          />
          <div 
            className="absolute flex flex-col items-center justify-center top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-[85%] transition duration-300 ease-in-out"
            style={{
              background: `linear-gradient(131deg, rgba(0, 120, 174, 1) 0%, rgba(92, 79, 146, 1) 68.5%, rgba(75, 66, 113, 1) 100%)`,
              color: "#fff",
            }}
          >
            <svg 
              className="h-1/3"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 560.22 560.03"
              fill="#fff"
            >
              <path d="M260.18,215.58l62.5-63.28c5.47-5.47,11.72-12.5,17.97-20.32,6.25-7.03,13.28-13.28,20.32-18.75,13.28-11.72,28.9-21.88,48.45-21.88,17.2,0,32.03,7.82,42.97,17.97s17.2,25,17.2,42.2c0,7.03-.78,14.85-3.12,20.32-5.47,10.95-10.15,18.75-14.85,25-2.35,3.12-4.7,6.25-4.7,9.38,0,2.35,0,4.7,1.57,5.47,8.6,21.1,14.85,39.07,18.75,60.95,2.35,8.6,7.03,12.5,14.85,12.5,3.12,0,6.25-.78,9.38-3.12,6.25-3.9,11.72-10.15,17.2-16.4,3.12-3.12,5.47-6.25,7.03-7.82,28.12-27.35,44.53-66.4,44.53-106.25,0-42.2-17.2-79.7-44.53-107.03C488.35,17.95,450.07,0,409.45,0s-79.7,16.4-107.03,45.32l-107.03,106.25c-28.12,28.9-43.75,66.4-43.75,106.25,0,11.72,4.7,35.95,12.5,58.6,7.83,21.88,17.97,41.4,31.25,41.4,7.03,0,21.88-11.72,34.38-25s25-28.12,25-33.6c0-3.9-3.12-8.6-6.25-15.62-3.9-7.03-5.47-15.62-5.47-25.78,0-15.62,6.25-31.25,17.2-42.2l-.07-.05Zm-2.33,300l107.03-106.25c28.12-27.35,43.75-67.2,43.75-107.03,0-11.72-4.7-35.15-12.5-57.82-7.03-21.88-17.97-42.2-31.25-42.2-5.47,0-21.88,12.5-33.6,25.78-13.28,13.28-25.78,27.35-25.78,32.82,0,3.9,2.35,10.15,6.25,16.4,3.9,7.03,7.03,14.85,7.03,25-.78,15.62-7.03,31.25-17.97,43.75l-63.28,62.5c-5.47,6.25-11.72,12.5-17.97,19.53l-19.53,19.53c-13.28,12.5-29.7,21.1-49.22,21.1-32.82,0-59.38-25.78-59.38-59.38,0-7.82,1.57-14.85,3.9-20.32,4.7-10.95,9.38-18.75,14.85-25,2.35-3.12,3.12-6.25,3.12-8.6,0-1.57-.78-3.12-1.58-6.25-9.38-21.1-14.85-39.07-18.75-60.95-1.57-3.9-2.35-7.03-4.7-8.6-2.35-3.12-6.25-3.9-10.15-3.9-3.12,0-5.48,.78-8.6,3.12-6.25,3.9-12.5,10.15-17.98,16.4-2.35,3.12-5.47,5.47-7.03,7.03C16.4,330.35,0,369.43,0,409.25s16.4,79.7,44.53,107.03c27.35,27.35,64.85,43.75,106.25,43.75s79.7-15.62,107.03-44.53l.05,.07Z"/>
            </svg>
            <span>view application</span>
          </div>
        </div>
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
                  ? text.slice(0, 160) + '...'
                  : `${text}&hellip;`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default AppCard;
