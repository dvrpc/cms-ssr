import React, { useEffect, useRef, useState } from "react";
import { Leftarrow, Rightarrow } from "../Icon";

const Carousel = ({ children }) => {
  const carouselRef = useRef(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (key) => {
    if (carouselRef.current) {
      const direction = key === "prev" ? -1 : 1;
      const scrollAmount = (screen.width / 2) * direction;
      carouselRef.current.scrollBy({
        behavior: "smooth",
        left: scrollAmount,
      });
      const scrollDiff = scrollLeft + scrollAmount;
      if (scrollDiff > carouselRef.current.scrollLeftMax) {
        setScrollLeft(carouselRef.current.scrollLeftMax);
      } else if (scrollDiff < 0) {
        setScrollLeft(0);
      } else {
        setScrollLeft(scrollDiff);
      }
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      if (scrollLeft === 0) {
        setPrevDisabled(true);
        setNextDisabled(false);
      } else if (
        scrollLeft > 0 &&
        scrollLeft < carouselRef.current.scrollLeftMax
      ) {
        setPrevDisabled(false);
        setNextDisabled(false);
      } else if (scrollLeft === carouselRef.current.scrollLeftMax) {
        setPrevDisabled(false);
        setNextDisabled(true);
      }
    }
  }, [scrollLeft]);

  return (
    <div className="relative">
      {children.length > 3 && (
        <div className="absolute flex h-full w-full items-center">
          <button
            className="ml-1 rounded-full bg-slate-200 p-2 disabled:invert"
            onClick={() => scroll("prev")}
            style={{ opacity: 0.85 }}
            disabled={prevDisabled}
          >
            <div className="flex h-2 w-2 items-center">
              <Leftarrow />
            </div>
          </button>
          <button
            className="ml-auto mr-1 rounded-full bg-slate-200 p-2 disabled:invert"
            onClick={() => scroll("next")}
            style={{ opacity: 0.85 }}
            disabled={nextDisabled}
          >
            <div className="flex h-2 w-2 items-center">
              <Rightarrow />
            </div>
          </button>
        </div>
      )}
      <div
        id="scrollContainer"
        ref={carouselRef}
        className="flex gap-4 overflow-hidden text-[#155575]"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
