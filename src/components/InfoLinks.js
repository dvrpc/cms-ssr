import React from "react";
import Icon, { Events, News, Products } from "./Icon";

const InfoLinks = () => {
  return (
    <aside
      style={{ borderImage: "linear-gradient(to left, #aaa, #fff) 1" }}
      className="border-t-2 py-4"
    >
      <div className="grid auto-cols-fr grid-flow-col">
        <a href="https://www.dvrpc.org/Calendar/" className="block text-center no-underline hover:underline">
          <Icon use={Events} className="mx-auto" scale={8} fillColor="#656565" />
          Events
        </a>
        <a href="https://www.dvrpc.org/News/" className="block text-center no-underline hover:underline">
          <Icon use={News} className="mx-auto" scale={8} fillColor="#656565" />
          News
        </a>
        <a href="https://www.dvrpc.org/Data/" className="block text-center no-underline hover:underline">
          <Icon use={Products} className="mx-auto" scale={8} fillColor="#656565" />
          Releases
        </a>
      </div>
    </aside>
  );
};

export default InfoLinks;
