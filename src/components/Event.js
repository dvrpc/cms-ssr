import React from "react";

const Event = ({ StartDate, StartTime, Title, Info }) => {
  StartTime = StartTime ?? "00:00";
  const [, mon, day] = StartDate.split("-");
  const hour = +StartTime.substring(0, 2);
  const start = (hour > 12 ? hour - 12 : hour) + StartTime.substring(2);
  return (
    <div
      key={StartDate + Title}
      className="flex h-full flex-col border-0 border-[#91BEDC] py-4 pt-0 md:border-r md:px-4 md:py-0 [&:last-child]:border-r-0"
    >
      <footer className="flex w-min leading-[24px] md:text-[18px]">
        <p className="m-0">
          {+mon}/{+day}
        </p>
        <span className="px-1">|</span>
        <span className="m-0">{StartTime !== "00:00" && start}</span>
      </footer>
      <p className="m-0 w-fit font-medium md:text-[20px] md:leading-[26px]">
        {Info ? (
          <a className="underline" href={Info}>
            {Title}
          </a>
        ) : (
          Title
        )}
      </p>
    </div>
  );
};

const EventLoader = (props) => (
  <div className="items-top flex w-72 animate-pulse gap-2 divide-x divide-gray-400 md:w-auto md:flex-1">
    <footer className="flex flex-col items-center">
      <span className="h-8 w-10 bg-gray-200" />
      <span className="my-2 h-6 w-10 bg-gray-200" />
    </footer>
    <span className="m-0 h-16 w-48 bg-gray-200 pl-2" />
  </div>
);

export default Event;
export { EventLoader };
