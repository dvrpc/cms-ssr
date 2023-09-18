import React from "react";

export const defaultThemeConfig = [
  ["field_primary_color", "--color-h1"],
  ["field_primary_color", "--color-h2"],
  ["field_primary_color", "--color-h3"],
  ["field_secondary_color", "--color-highlight"],
  [
    "relationships.field_banner",
    "--bg-cover-image",
    (val) =>
      val
        .map(
          (obj) => obj.uri?.url && `url(https://cdn.dvrpc.org${obj.uri?.url})`
        )
        .reverse()
        .join(", "),
  ],
  [
    "relationships.field_banner_2x",
    "--bg-cover-image",
    (val) =>
      val
        .map(
          (obj) => obj.uri?.url && `url(https://cdn.dvrpc.org${obj.uri?.url})`
        )
        .reverse()
        .join(", "),
  ],
  [
    "field_photo_credits",
    "--content-photo-credits",
    (val) => (val ? `"${val}"` : `""`),
  ],
  ["relationships.field_banner", "--height-banner", () => "400px"],
];

export const themeToCustomVars = (theme, config = defaultThemeConfig) => {
  return config
    .map(([key, customVar, parseFunc = (v) => v]) => {
      const val = key
        .split(".")
        .reduce((prev, cur) => prev && prev[cur], theme);
      return parseFunc(val) ? `${customVar}: ${parseFunc(val)};` : null;
    })
    .join("\n");
};

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
