import React, { useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";

const SearchPage = () => {
  const params = new URLSearchParams(location.search);
  const query = params.get("q") ?? "";
  const querySet = query.length ? new Set(query.split(",")) : new Set();
  const keywordRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      if (!query) return;
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
    <div className="p-4">
      <div className="mb-2 overflow-hidden rounded-sm bg-white">
        <h1>Products Search</h1>
        <p>
          The DVRPC Products Database is continuously updated as reports and
          other items become available. Visitors can view publication abstracts
          and/or full PDF versions for over 1,000 reports from the late 1980s to
          present. You can also see a <a href="/">quick list</a> of reports
          published in the last year.
        </p>
      </div>
      <hr />
      <form
        className="mb-2 overflow-hidden rounded-sm bg-white"
        onSubmit={(e) => {
          e.preventDefault();
          if (!querySet.has(keywordRef.current.value))
            querySet.add(keywordRef.current.value);
          keywordRef.current.value = "";
          navigate(`?q=${Array.from(querySet).join(",")}`);
        }}
      >
        <h1>Keyword Search</h1>
        <input
          placeholder="Search by keyword"
          ref={keywordRef}
          className="focus:shadow-outline my-2 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        ></input>
        <div>
          {query.length > 0 &&
            query.split(",").map((param) => (
              <button
                className="mr-2 cursor-pointer rounded-full bg-[#999999] p-1 py-1 px-4 text-white"
                onClick={() => {
                  querySet.delete(param);
                  setProducts([]);
                  navigate(`?q=${Array.from(querySet).join(",")}`);
                }}
                type="button"
              >
                {param} &times;
              </button>
            ))}
        </div>
      </form>

      <div className="mb-2 grid grid-cols-2 overflow-hidden rounded-sm bg-white">
        <div>
          <h1>DVRPC Products</h1>
          {products.length > 0 &&
            products.map((product) => (
              <div className="flex max-h-min text-sm">
                <img
                  src={`https://www.dvrpc.org/asp/pubs/100px/${product.Id}.png`}
                  className="h-1/2 max-w-fit object-cover"
                ></img>
                {product.Title}
              </div>
            ))}
        </div>
        <div>
          <h1>All Results</h1>
          {results.items.length > 0 &&
            results.map((result) => (
              <div className="mb-4 space-y-1">
                <a href={result.formattedUrl} className="text-lg font-bold">
                  {result.title}
                </a>
                <div dangerouslySetInnerHTML={{ __html: result.htmlSnippet }} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
