import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const SearchPage = () => {
  const params = new URLSearchParams(location.search);
  const query = params.get("q") ?? "";
  const querySet = query.length ? new Set(query.split(",")) : new Set();
  const keywordRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      if (!query) {
        setProducts([]);
        setResults([]);
        return;
      }
      const [products, results] = await Promise.all([
        fetch(`https://www.dvrpc.org/api/Products?keywords=${query}`).then(
          (res) => res.json()
        ),
        fetch(`https://www.dvrpc.org/api/search?q=${query}`).then((res) =>
          res.json()
        ),
      ]);
      setProducts(products);
      setResults(results.items);
    })();
  }, [query]);

  return (
    <>
      <Body title="Products Search">
        <div className="mb-2 overflow-hidden rounded-sm">
          <p>
            The DVRPC Products Database is continuously updated as reports and
            other items become available. Visitors can view publication
            abstracts and/or full PDF versions for over 1,000 reports from the
            late 1980s to present. You can also see a{" "}
            <a href="/products/recent">quick list</a> of reports published in
            the last year.
          </p>
        </div>
        <div className="card">
          <h2 className="flex items-center">
            <span>Results</span>
            <span className="ml-auto text-base">
              {!query ? "No" : products.length + results.length} result(s) found
            </span>
          </h2>
          <form
            className="mb-2 overflow-hidden rounded-sm"
            onSubmit={(e) => {
              e.preventDefault();
              if (!querySet.has(keywordRef.current.value))
                querySet.add(keywordRef.current.value);
              keywordRef.current.value = "";
              navigate(`?q=${Array.from(querySet).join(",")}`, {
                replace: true,
                state: {
                  disableScrollUpdate: true,
                },
              });
            }}
          >
            <input
              placeholder="Search by keyword"
              ref={keywordRef}
              className="my-2 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            ></input>
            <div>
              {query.length > 0 &&
                query.split(",").map((param) => (
                  <button
                    className="mr-2 cursor-pointer rounded-full bg-[#999999] p-1 py-1 px-4 text-white"
                    onClick={() => {
                      querySet.delete(param);
                      navigate(`?q=${Array.from(querySet).join(",")}`, {
                        replace: true,
                        state: {
                          disableScrollUpdate: true,
                        },
                      });
                    }}
                    type="button"
                  >
                    {param} &times;
                  </button>
                ))}
            </div>
          </form>
          {(products.length > 0 || results.length > 0) && (
            <div className="mb-2 grid grid-cols-2">
              <div>
                <h3>DVRPC Products</h3>
                {products.length > 0 &&
                  products.map((product) => (
                    <div className="flex text-sm">
                      <img
                        src={`https://www.dvrpc.org/asp/pubs/100px/${product.Id}.png`}
                        className="object-cover"
                      ></img>
                      {product.Title}
                    </div>
                  ))}
              </div>
              <div>
                <h3>All Results</h3>
                {results.length > 0 &&
                  results.map((result) => (
                    <div className="mb-4 space-y-1">
                      <a
                        href={result.formattedUrl}
                        className="text-lg font-bold"
                      >
                        {result.title}
                      </a>
                      <div
                        className="text-sm"
                        dangerouslySetInnerHTML={{ __html: result.htmlSnippet }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Body>
      <StaffContact />
    </>
  );
};

export default SearchPage;
