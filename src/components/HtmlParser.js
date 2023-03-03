import React from "react";
import HtmlMapper from "react-html-map";
import Link from "./Link";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

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
      a: ({ href, children, ...rest }) => {
        href = href.replace(/https?:\/\/www.dvrpc.org/, "");
        //Relative URLs (with no extension) are assumed to be internal links
        if (href.startsWith("/") && href.indexOf(".") === -1) {
          return <Link to={href.toLowerCase()}>{children}</Link>;
        } else if (
          //List of media files extensions supported - match to graphql query
          ["pdf", "doc", "docx", "xls", "xlsx", "zip"].some((ext) =>
            href.endsWith(`.${ext}`)
          )
        ) {
          const result = data.documents.edges.filter(
            ({ node }) =>
              node.filename === href.substr(href.lastIndexOf("/") + 1)
          )[0];
          if (result) {
            console.log("local file found: ", result);
            return (
              <a
                key={rest["data-entity-uuid"]}
                href={result.node.localFile.publicURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          }
        }
        const { style, index, class: className, ...props } = rest;
        return (
          <a className={className} href={href} {...props}>
            {children}
          </a>
        );
      },
      img: (attribs) => {
        const result = data.images.edges.filter(
          ({ node }) => node.drupal_id === attribs["data-entity-uuid"]
        )[0];

        if (result) {
          console.log("local image found: ", result);
          return (
            <GatsbyImage
              key={attribs["data-entity-uuid"]}
              loading="lazy"
              image={getImage(result.node.localFile)}
              alt={attribs.alt || ""}
            />
          );
        } else {
          console.warn(`no local image found for: ${attribs["src"]}`);
          const { children, src, class: className, ...attrs } = attribs;
          return (
            <img
              key={attribs["data-entity-uuid"]}
              loading="lazy"
              {...attrs}
              src={`https://cms.dvrpc.org${attribs.src}`}
              className={className}
            />
          );
        }
      },
    }}
  </HtmlMapper>
);

export default HtmlParser;
