import React, { useEffect, useState } from "react";

const RecentProductsPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      const req = await fetch("https://www.dvrpc.org/api/products");
      const res = await req.json();
      setProducts(res);
    })();
  }, [setProducts]);

  return (
    <div>
      <h1>Recent Products</h1>
      <p>
        Here is a list of products released by DVRPC in the past year, sorted
        newest-to-oldest, by date the product was added to our website.
      </p>
      <hr />
      <table className="table-auto">
        <thead>
          <tr className="font-bold">
            <td>Product</td>
            <td>Title</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.Id}</td>
              <td>
                <a
                  href={`https://www.dvrpc.org/products/${product.Id}`}
                  className="underline"
                >
                  {product.Title}
                </a>
              </td>
              <td>{new Date(product.DateLive).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentProductsPage;
