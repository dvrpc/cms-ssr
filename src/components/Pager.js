import React, { cloneElement, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const PageRange = ({
  currentPage,
  maxPage,
  onPageChange,
  setPage,
  setRenderedItems,
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
              setPage(() => {
                setRenderedItems(onPageChange(1));
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
          className="mx-1 disabled:h-9 disabled:w-9 disabled:rounded-full disabled:bg-[#03688D] disabled:text-white"
          onClick={() => {
            setPage(() => {
              setRenderedItems(onPageChange(num));
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
                setRenderedItems(onPageChange(maxPage));
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
  const [page, setPage] = useState(currentPage);
  const [renderedItems, setRenderedItems] = useState([...items]);
  const maxPage = Math.ceil(maxData / itemsPerPage);
  const firstRender = useRef(true);
  const pageLoad = useRef(false);

  // redirect back to first page when filtering client-side
  useEffect(() => {
    if (firstRender.current) firstRender.current = false;
    else if (!firstRender.current && currentPage === 1) {
      setPage(1);
      setRenderedItems([...items]);
    }
  }, [page, items, firstRender]);

  useEffect(() => {
    if (pageLoad.current && page !== currentPage) {
      setPage(currentPage);
      setRenderedItems(onPageChange(currentPage));
    } else pageLoad.current = true;
  }, [currentPage, setRenderedItems, onPageChange, pageLoad]);

  return (
    <>
      {renderItem && items.length <= itemsPerPage
        ? items.map((item) => renderItem(item))
        : renderedItems.slice(0, itemsPerPage).map((item) => renderItem(item))}
      <div className="my-6 mx-auto flex justify-around font-bold text-[#03688D] md:w-1/2">
        <button
          className="disabled:text-gray-300 md:mr-4"
          disabled={page === 0 || page === 1}
          onClick={() =>
            setPage((curr) => {
              setRenderedItems(onPageChange(curr - 1));
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
          setRenderedItems={setRenderedItems}
          data={items}
        />
        <button
          className="disabled:text-gray-300 md:ml-4"
          disabled={page === maxPage || !renderedItems.length}
          onClick={() => {
            setPage((curr) => {
              setRenderedItems(onPageChange(curr + 1));
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
