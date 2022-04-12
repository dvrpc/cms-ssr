import React from "react";
import { isSSR } from "../pages/index";

const Hamburger = () => {
  return (
    <div
      className="hamburger"
      id="hamburger-1"
      onClick={(e) => {
        if (!isSSR) {
          if (!e.target.id) {
            e.target.parentElement.classList.toggle("is-active");
          } else {
            e.target.classList.toggle("is-active");
          }
        }
      }}
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>
  );
};

export default Hamburger;
