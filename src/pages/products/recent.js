import React from "react";
import Body from "../../components/Body";
import StaffContact from "../../components/StaffContact";

const RecentProductsPage = ({ serverData }) => {
  return (
    <>
      <Body title="Recent Products">
        <div className="mt-4">
          Here is a list of products released by DVRPC in the past year, sorted
          newest-to-oldest, by date the product was added to our website.
        </div>
        <br />
        <table className="w-3/4 table-auto">
          <thead>
            <tr className="font-bold">
              <td>Product</td>
              <td>Title</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {serverData
              .sort((a, b) => new Date(b.DateLive) - new Date(a.DateLive))
              .map((product) => (
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
      </Body>
      <StaffContact />
    </>
  );
};

export default RecentProductsPage;

export async function getServerData() {
  try {
    const res = await fetch(
      "https://www.dvrpc.org/api/products?onlyFeatured=false"
    );
    if (!res.ok) {
      throw new Error("Response failed");
    }

    return {
      props: await res.json(),
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}
