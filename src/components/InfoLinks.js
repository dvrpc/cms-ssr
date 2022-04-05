import React from "react";
import Icon, { Events, News, Products } from "./Icon";

const InfoLinks = () => {
  return (
    <aside
      style={{ borderImage: "linear-gradient(to left, #aaa, #fff) 1" }}
      className="py-4 border-t-2"
    >
      <div className="grid grid-flow-col auto-cols-fr">
        <a href="https://www.dvrpc.org/Calendar/" className="block text-center">
          <Icon use={Events} className="mx-auto h-10" fillColor="#656565" />
          Events
        </a>
        <a href="https://www.dvrpc.org/News/" className="block text-center">
          <Icon use={News} className="mx-auto h-10" fillColor="#656565" />
          News
        </a>
        <a href="https://www.dvrpc.org/Data/" className="block text-center">
          <Icon use={Products} className="mx-auto h-10" fillColor="#656565" />
          Releases
        </a>
      </div>
    </aside>
  );
};

export default InfoLinks;
