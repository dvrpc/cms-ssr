import React from "react";
import parse, { domToReact } from "html-react-parser";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const a = ({ attribs, children }, query, options) => {
  const href = attribs.href.replace(/https?:\/\/www.dvrpc.org/, "");
  //Relative URLs (with no extension) are assumed to be internal links
  if (href.startsWith("/") && href.indexOf(".") === -1) {
    return <Link to={href}>{domToReact(children, options)}</Link>;
  } else if (
    //List of media files extensions supported - match to static query
    ["pdf", "doc", "docx", "xls", "xlsx", "zip"].some((ext) =>
      href.endsWith(`.${ext}`)
    )
  ) {
    const result = query.documents.edges.filter(
      ({ node }) =>
        node.filename === attribs.href.substr(attribs.href.lastIndexOf("/") + 1)
    )[0];
    if (result) {
      console.log("local file found: ", result);
      return (
        <Link
          to={result.node.localFile.publicURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {domToReact(children, options)}
        </Link>
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
        loading="eager"
        image={getImage(result.node.localFile)}
        alt={attribs.alt || ""}
      />
    );
  }
  console.warn(`no local image found for: ${attribs["data-entity-uuid"]}`);
  return undefined;
};

const parseHtml = (src) => {
  const query = useStaticQuery(graphql`
    query Files {
      images: allFileFile(
        filter: {
          localFile: {
            extension: { in: ["png", "jpg", "jpeg", "gif", "svg", "webp"] }
          }
        }
      ) {
        edges {
          node {
            drupal_id
            filename
            localFile {
              childImageSharp {
                gatsbyImageData(
                  width: 783
                  quality: 100
                  outputPixelDensities: [1]
                  layout: CONSTRAINED
                  formats: [AUTO]
                )
              }
            }
          }
        }
      }
      documents: allFileFile(
        filter: {
          localFile: {
            extension: { in: ["pdf", "doc", "docx", "xls", "xlsx", "zip"] }
          }
        }
      ) {
        edges {
          node {
            drupal_id
            filename
            localFile {
              publicURL
            }
          }
        }
      }
    }
  `);

  const options = {
    replace: (data) => {
      if (data.name === "a") return a(data, query, options);
      if (data.name === "img") return img(data, query);
    },
  };

  return parse(src, options);
};

export default parseHtml;
