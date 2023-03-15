import React, { useCallback, useEffect } from "react";
import Icon, { DvrpcMini } from "./Icon";
import Link from "./Link";

const useEscapeKey = (handleClose) => {
  const handleEscKey = useCallback(
    (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscKey, false);
    return () => {
      document.removeEventListener("keyup", handleEscKey, false);
    };
  }, [handleEscKey]);
};

const showDialog = () =>
  document.getElementById("dialog").classList.add("open");
const hideDialog = () =>
  document.getElementById("dialog").classList.remove("open");

const rootNavArr = [
  {
    link: "About",
    href: "/About/",
  },
  {
    link: "Data Center",
    href: "/Data/",
  },
  {
    link: "Long-&#8203;Range Plan",
    href: "/LongRangePlan/",
  },
  {
    link: "TIP",
    href: "/TIP/",
  },
  {
    link: "Transportation",
    href: "/Transportation/",
  },
  {
    link: "Livable Communities",
    href: "/LivableCommunities/",
  },
  {
    link: "Planning Assistance",
    href: "/Planning/",
  },
  {
    link: "Commuters",
    href: "/CommuterServices/",
  },
  {
    link: "Get Involved",
    href: "/GetInvolved/",
  },
];

const RootNav = ({ data }) => {
  return data.map((item, index) => {
    return (
      <div
        key={index}
        className="flex w-full items-stretch leading-[1.2rem] xl:w-auto xl:items-center"
      >
        <Link
          className="flex items-stretch divide-x text-center no-underline hover:underline xl:ml-3"
          to={item.href}
          dangerouslySetInnerHTML={{ __html: `<div>${item.link}</div>` }}
          onClick={hideDialog}
        />
      </div>
    );
  });
};

const TopNav = ({ menu }) => {
  useEscapeKey(hideDialog);

  return (
    <div className="row-span-2 text-right lg:ml-8 xl:self-end">
      <nav className="ml-auto mb-5 hidden items-stretch justify-end gap-y-1 gap-x-3 divide-x divide-gray-400 text-center text-[color:var(--color-default)] xl:flex">
        <RootNav data={rootNavArr} />
      </nav>
      <button
        onClick={showDialog}
        className="cursor-pointer list-none text-right text-3xl font-bold leading-none text-[color:var(--color-default)] xl:hidden"
      >
        ☰
      </button>
      <dialog
        id="dialog"
        className="pointer-events-none top-0 left-0 right-0 bottom-0 z-40 m-0 h-full max-h-full w-full max-w-full bg-[color:var(--color-default)] p-0 text-xl text-white opacity-0 transition-opacity duration-500 ease-in-out [&.open]:pointer-events-auto [&.open]:grid [&.open]:opacity-100"
        open
      >
        <div className="container px-8">
          <div className="my-5 flex h-[70.5px] items-center justify-between">
            <a href="/" className="row-span-2">
              <Icon
                use={DvrpcMini}
                fillColor={"#fff"}
                scale={null}
                className="mx-auto h-[70.5px]"
              />
            </a>
            <button
              onClick={hideDialog}
              className="cursor-pointer list-none text-3xl font-bold leading-none"
            >
              ✖
            </button>
          </div>
          <div className="flex flex-col items-stretch gap-6">
            <RootNav data={rootNavArr} />
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TopNav;
