import React from "react";

const HeadTemplate = ({ title, summary, css }) => (
  <>
    <title>{title} | DVRPC</title>
    {summary && <meta name="description" content={summary} />}
    <style>
      {`:root {
        ${css}
      }`}
    </style>
  </>
);

export default HeadTemplate;
