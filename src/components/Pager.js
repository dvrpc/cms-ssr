import React, { cloneElement, useState } from "react";
import PropTypes from "prop-types";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PageRange = ({
  currentPage,
  maxPage,
  onPageChange,
  setPage,
  setRenderedData,
}) => {
  let renderedRange = null;
  let start = true;
  let end = false;
  if (currentPage < 5) {
    start = true;
    end = false;
    renderedRange = range(1, maxPage < 5 ? maxPage : 5, 1);
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
              setPage((curr) => {
                setRenderedData(onPageChange(0));
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
            setPage(() => {
              setRenderedData(onPageChange(num));
              return num;
            });
          }}
        >
          {num}
        </button>
      ))}
      {maxPage > 5 && !end && (
        <>
          ...
          <button
            onClick={() =>
              setPage(() => {
                setRenderedData(onPageChange(maxPage));
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

const Pager = ({
  items,
  onPageChange,
  currentPage = 1,
  itemsPerPage = 10,
  maxData = items.length,
  renderItem,
}) => {
  const [renderedData, setRenderedData] = useState([...items]);
  const [page, setPage] = useState(currentPage);
  const maxPage = Math.ceil(maxData / itemsPerPage);

  return (
    <>
      {renderItem
        ? items.length === itemsPerPage
          ? items.map((item) => renderItem(item))
          : renderedData.slice(0, itemsPerPage).map((item) => renderItem(item))
        : items.map((item) => <div>{item}</div>)}
      <div className="my-6 flex justify-around font-bold text-[color:var(--color-default)]">
        <button
          className="disabled:text-gray-300"
          disabled={page === 0 || page === 1}
          onClick={() =>
            setPage((curr) => {
              setRenderedData(onPageChange(curr - 1));
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
          currentPage={page}
          maxPage={maxPage}
          onPageChange={onPageChange}
          setPage={setPage}
          setRenderedData={setRenderedData}
          data={renderedData}
        />
        <button
          className="disabled:text-gray-300"
          disabled={page === maxPage}
          onClick={() => {
            setPage((curr) => {
              setRenderedData(onPageChange(curr + 1));
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
  items: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,
  maxData: PropTypes.number,
  renderItem: PropTypes.func,
};

export default Pager;
// class PagerProvider {
//   constructor(
//     data,
//     onPageChange,
//     current = 1,
//     itemsPerPage = 10,
//     maxData = data.length
//   ) {
//     this.data = data;
//     this.onPageChange = onPageChange;
//     this.current = current;
//     this.itemsPerPage = itemsPerPage;
//     this.maxData = maxData;
//   }
// }
