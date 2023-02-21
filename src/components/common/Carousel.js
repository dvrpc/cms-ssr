import React, { useEffect, useRef, useState } from 'react';
import { Leftarrow, Rightarrow } from '../Icon';

const Carousel = ({ children }) => {
  const carouselRef = useRef(null);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scroll = (key) => {
    if (carouselRef.current) {
      const direction = key === 'prev' ? -1 : 1;
      const childElem = carouselRef.current.firstChild
      const childStyle = window.getComputedStyle(childElem)
      const scrollAmount = carouselRef.current.clientWidth === childElem.offsetWidth + (parseFloat(childStyle.marginLeft) * 2) 
        ? (carouselRef.current.clientWidth) * direction
        : (screen.width / 2) * direction;
      const scrollLeftMax =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({
        behavior: 'smooth',
        left: scrollAmount,
      });
      const scrollDiff = scrollLeft + scrollAmount;
      if (scrollDiff > scrollLeftMax) {
        setScrollLeft(scrollLeftMax);
      } else if (scrollDiff < 0) {
        setScrollLeft(0);
      } else {
        setScrollLeft(scrollDiff);
      }
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const scrollLeftMax =
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth;
      if (scrollLeft === 0) {
        setPrevDisabled(true);
        setNextDisabled(false);
      } else if (scrollLeft > 0 && scrollLeft < scrollLeftMax) {
        setPrevDisabled(false);
        setNextDisabled(false);
      } else if (scrollLeft === scrollLeftMax) {
        setPrevDisabled(false);
        setNextDisabled(true);
      }
    }
  }, [scrollLeft]);

  return (
    <div className="relative">
      {children.length > 3 && (
        <div className="flex w-full items-center">
          <button
            className="ml-1 rounded-full p-2 disabled:opacity-30"
            onClick={() => scroll('prev')}
            disabled={prevDisabled}
          >
            <div className="flex h-2 w-2 items-center">
              <Leftarrow />
            </div>
          </button>
          <button
            className="ml-auto mr-1 rounded-full p-2 disabled:opacity-30"
            onClick={() => scroll('next')}
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
        className="flex overflow-hidden text-[#155575]"
      >
        {children}
      </div>
    </div>
  );
};

export default Carousel;
