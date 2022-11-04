import React from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const a = (el, query, options) => {
  const href = el.attribs.href.replace(/https?:\/\/www.dvrpc.org/, "");
  //Relative URLs (with no extension) are assumed to be internal links
  if (href.startsWith("/") && href.indexOf(".") === -1) {
    return (
      <Link to={href.toLowerCase()}>
        {el.children.map((e, i) => convertNodeToElement(e, i, options))}
      </Link>
    );
  } else if (
    //List of media files extensions supported - match to static query
    ["pdf", "doc", "docx", "xls", "xlsx", "zip"].some((ext) =>
      href.endsWith(`.${ext}`)
    )
  ) {
    const result = query.documents.edges.filter(
      ({ node }) =>
        node.filename ===
        el.attribs.href.substr(el.attribs.href.lastIndexOf("/") + 1)
    )[0];
    if (result) {
      console.log("local file found: ", result);
      return (
        <a
          href={result.node.localFile.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {el.children.map((e, i) => convertNodeToElement(e, i, options))}
        </a>
      );
    }
  }
  return undefined;
};

const img = ({ attribs }, query) => {
  const result = query.images.edges.filter(
    ({ node }) => node.drupal_id === attribs["data-entity-uuid"]
  )[0];
  if (result) {
    console.log("local image found: ", result);
    return (
      <GatsbyImage
        loading="lazy"
        image={getImage(result.node.localFile)}
        alt={attribs.alt || ""}
      />
    );
  } else {
    console.warn(`no local image found for: ${attribs["src"]}`);
    const { src, class: className, ...attrs } = attribs;
    return (
      <img
        loading="lazy"
        {...attrs}
        src={`https://cms.dvrpc.org${attribs.src}`}
        className={className}
      />
    );
  }
};

const parseHtml = (src, query) => {
  const options = {
    transform: (node) => {
      if (node.name === "a") return a(node, query, options);
      if (node.name === "img") return img(node, query);
    },
  };

  return ReactHtmlParser(src, options);
};

export default parseHtml;
