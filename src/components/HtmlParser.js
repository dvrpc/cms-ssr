import React from "react";
import HtmlMapper from "react-html-map";
import Link from "./Link";

const genericElement =
  (elementType) =>
  ({ children, class: className, ...rest }) => {
    const Type = elementType;
    return (
      <Type className={className} {...rest}>
        {children}
      </Type>
    );
  };

const emptyElement =
  (elementType) =>
  ({ class: className }) => {
    const Type = elementType;
    return <Type className={className} />;
  };

const HtmlParser = ({ html, data }) => (
  <HtmlMapper html={html} acceptUnknown>
    {{
      br: emptyElement("br"),
      hr: emptyElement("hr"),
      figure: genericElement("figure"),
      div: genericElement("div"),
      a: ({ href, children, style, index, class: className, ...props }) => {
        href = href.replace("https://cms.dvrpc.org/", "https://cdn.dvrpc.org/");
        //Relative URLs (with no extension) are assumed to be internal links
        if (href.startsWith("/") && href.indexOf(".") === -1) {
          return (
            <Link className={className} to={href.toLowerCase()} {...props}>
              {children}
            </Link>
          );
        }
        return (
          <a className={className} href={href} {...props}>
            {children}
          </a>
        );
      },
      img: (attribs) => {
        const { children, src, class: className, ...attrs } = attribs;
        return (
          <img
            loading="lazy"
            {...attrs}
            src={`https://cdn.dvrpc.org${attribs.src}`}
            className={className}
          />
        );
      },
    }}
  </HtmlMapper>
);

export default HtmlParser;
