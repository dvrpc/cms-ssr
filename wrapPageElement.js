import React from "react";
import Layout from "./src/layouts/index";

export default function wrapPageElement({ element, props }) {
  if (!props.pageContext.layout) return;

  return <Layout {...props}>{element}</Layout>;
}
