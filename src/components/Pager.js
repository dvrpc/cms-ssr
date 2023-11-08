import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Product from "./Product";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

class PagerProvider {
  constructor(jump, current = 1, itemsPerPage = 10, maxData = 1359) {
    this.jump = jump;
    this.current = current;
    this.itemsPerPage = itemsPerPage;
    this.maxData = maxData;
  }
}

const PageRange = ({ currentPage, maxPage, jump, setCurrentPage }) => {
  let renderedRange = null;
  let start = true;
  let end = false;
  if (currentPage < 5) {
    start = true;
    end = false;
    renderedRange = range(1, 5, 1);
  } else if (currentPage >= 5 && currentPage <= maxPage - 4) {
    start = false;
    end = false;
    renderedRange = range(currentPage - 1, currentPage + 1, 1);
  } else if (currentPage > maxPage - 4) {
    start = false;
    end = true;
    renderedRange = range(maxPage - 4, maxPage, 1);
  }

  return (
    <>
      {!start && (
        <>
          <button
            onClick={() =>
              setCurrentPage((curr) => {
                jump(0);
                return 1;
              })
            }
          >
            1
          </button>
          ...
        </>
      )}
      {renderedRange.map((num) => (
        <button
          disabled={num === currentPage}
          className="mx-1 disabled:h-9 disabled:w-9 disabled:rounded-full disabled:bg-[color:var(--color-default)] disabled:text-white"
          onClick={() => {
            setCurrentPage(() => {
              jump(num);
              return num;
            });
          }}
        >
          {num}
        </button>
      ))}
      {!end && (
        <>
          ...
          <button
            onClick={() =>
              setCurrentPage(() => {
                jump(maxPage);
                return maxPage;
              })
            }
          >
            {maxPage}
          </button>
        </>
      )}
    </>
  );
};

const Pager = (props) => {
  const { jump, current, itemsPerPage, maxData } = props.provider;
  const maxPage = Math.ceil(maxData / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(current);

  return (
    <>
      {props.children}
      <div className="my-6 flex justify-around font-bold text-[color:var(--color-default)]">
        <button
          className="disabled:text-gray-300"
          disabled={currentPage === 0 || currentPage === 1}
          onClick={() =>
            setCurrentPage((curr) => {
              jump(curr - 1);
              return curr - 1;
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="origin-top scale-75 fill-current"
          >
            <path d="m17 0 3 3-10 9 10 9-3 3L5 12z" />
          </svg>
        </button>
        <PageRange
          currentPage={currentPage}
          maxPage={maxPage}
          jump={jump}
          setCurrentPage={setCurrentPage}
        />
        <button
          className="disabled:text-gray-300"
          disabled={currentPage === maxPage}
          onClick={() => {
            setCurrentPage((curr) => {
              jump(curr + 1);
              return curr + 1;
            });
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            className="origin-top scale-75 fill-current "
          >
            <path d="m5 3 3-3 12 12L8 24l-3-3 9-9z" />
          </svg>
        </button>
      </div>
    </>
  );
};

Pager.propTypes = {
  provider: PropTypes.instanceOf(PagerProvider),
};

export default Pager;
export { PagerProvider };
