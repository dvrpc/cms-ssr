import React from "react";
import HtmlMapper from "react-html-map";
import Link from "./Link";

const genericElement =
  (elementType) =>
  ({ children, class: className, style, ...rest }) => {
    const Type = elementType;
    return (
      <Type className={className} style={parseInlineStyle(style)} {...rest}>
        {children}
      </Type>
    );
  };

const emptyElement =
  (elementType) =>
  ({ class: className, style }) => {
    const Type = elementType;
    return <Type className={className} style={parseInlineStyle(style)} />;
  };

const transformCase = (str) =>
  str.split("-").reduce((prev, current) => {
    const [first, ...rest] = current;
    return prev + first.toUpperCase() + rest.join("");
  });

const parseInlineStyle = (style = "") =>
  Object.fromEntries(
    style
      .split(";")
      .map((s) => {
        if (s.indexOf(":") < 0) return;
        const [key, value] = s.split(":");
        return [transformCase(key.trim()), value.trim()];
      })
      .filter(Boolean)
  );

const HtmlParser = ({ html, data }) => (
  <HtmlMapper html={html} acceptUnknown>
    {{
      a: ({ children, class: className, href, style, ...props }) => {
        if (href === undefined) return;
        href = href.replace("https://cms.dvrpc.org/", "https://cdn.dvrpc.org/");
        //Relative URLs (with no extension) are assumed to be internal links
        if (href.startsWith("/") && href.indexOf(".") === -1) {
          return (
            <Link
              className={className}
              style={parseInlineStyle(style)}
              to={href.toLowerCase()}
              {...props}
            >
              {children}
            </Link>
          );
        }
        return (
          <a
            className={className}
            href={href}
            style={parseInlineStyle(style)}
            {...props}
          >
            {children}
          </a>
        );
      },
      br: emptyElement("br"),
      div: genericElement("div"),
      em: genericElement("em"),
      figure: genericElement("figure"),
      form: genericElement("form"),
      h2: genericElement("h2"),
      h3: genericElement("h3"),
      hr: emptyElement("hr"),
      iframe: emptyElement("iframe"),
      img: (attribs) => {
        const { children, class: className, src, style, ...attrs } = attribs;
        return (
          <img
            className={className}
            loading="lazy"
            src={`https://cdn.dvrpc.org${attribs.src}`}
            style={parseInlineStyle(style)}
            {...attrs}
          />
        );
      },
      input: emptyElement("input"),
      meta: emptyElement("meta"),
      ol: genericElement("ol"),
      p: genericElement("p"),
      span: genericElement("span"),
      strong: genericElement("strong"),
      table: genericElement("table"),
      td: genericElement("td"),
      tr: genericElement("tr"),
      ul: genericElement("ul"),
      video: genericElement("video"),
    }}
  </HtmlMapper>
);

export default HtmlParser;
