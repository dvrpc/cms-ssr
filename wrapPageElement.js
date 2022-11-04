import React from "react";
import Layout from "./src/layouts/index";

export default function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}
