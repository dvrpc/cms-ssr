import React from "react";
import HtmlMapper from "react-html-map";
import Link from "./Link";
import PlanCarousel from "../components/PlanCarousel";
import IframeResizer from "@iframe-resizer/react";

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

const HtmlParser = ({ html }) => (
  <HtmlMapper html={html} acceptUnknown>
    {{
      a: ({ children, class: className, href, style, ...props }) => {
        if (href === undefined) return;
        href = href.replace("https://cms.dvrpc.org/", "https://cdn.dvrpc.org/");
        if (/^\/sites\/default\/files\//.test(href)) {
          href = "https://cdn.dvrpc.org" + href;
        }
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
      figure: (attribs) => {
        const elem = attribs.class;
        const elemMap = {
          "plan-carousel": <PlanCarousel />,
        };
        return elemMap[elem]
          ? elemMap[elem]
          : genericElement("figure")(attribs);
      },
      form: genericElement("form"),
      h2: genericElement("h2"),
      h3: genericElement("h3"),
      hr: emptyElement("hr"),
      iframe: (attribs) => {
        return (
          <IframeResizer
            license="GPLv3"
            src={attribs.src}
            style={{ width: "100%", height: "100vh" }}
            waitForLoad
          />
        );
      },
      img: (attribs) => {
        const { children, class: className, src, style, ...attrs } = attribs;
        return (
          <img
            className={className}
            loading="lazy"
            src={
              attribs.src.startsWith("/")
                ? `https://cdn.dvrpc.org${attribs.src}`
                : attribs.src
            }
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
