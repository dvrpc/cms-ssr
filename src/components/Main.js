import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import tw, { css } from "twin.macro";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

const styles = [
  tw`mx-4 mt-8`,
  css`
    max-width: 80ch;

    hr {
      ${tw`border border-solid border-gray-400 mx-16 my-8`}
    }
    a {
      ${tw`underline`}
      color: inherit;
    }
    h1 {
      ${tw`mt-0 text-3xl font-bold`}
      color: ${(props) => props.theme.h1};
    }
    h2 {
      ${tw`font-bold text-xl my-4 clear-both`}
      color: ${(props) => props.theme.h2};
    }
    h3 {
      ${tw`font-bold text-lg my-4`}
      color: ${(props) => props.theme.h3};
    }
    h4 {
      ${tw`font-bold text-lg my-4`}
    }
    p {
      ${tw`my-4`}
    }
    p.lead {
      ${tw`text-lg`}
    }
    ol {
      list-style: decimal;
      ${tw`my-4`}
    }
    ol[type='A'] {
      list-style: upper-alpha;
    }
    ul {
      ${tw`pl-10 my-4 list-disc`}
    }
    .size-medium {
      ${tw`w-1/2 ml-4`}
    }
    .fright,
    .alignright {
      ${tw`float-right m-0 ml-8`}
    }
    .fleft,
    .alignleft {
      ${tw`float-left m-0 mr-8`}
    }
    figure {
      ${tw`table max-w-sm rounded border border-solid border-gray-400 p-1 bg-white italic`}
    }
    figcaption {
      ${tw`p-2 table-caption`}
      caption-side: bottom;
    }
    img {
      ${tw`max-w-full block`}
    }
    .alignfull {
      ${tw`max-w-full mx-auto`}
    }
    .sm {
      ${tw`text-sm text-red-700`}
    }
    .btn {
      ${tw`inline-block no-underline text-center align-middle border-solid border-0 border-transparent py-2 px-3 rounded transition duration-150 ease-in-out`}
    }
    .btn-primary {
      ${tw`text-white bg-blue-700 border-blue-700 hover:bg-blue-800`}
    }
    [disabled],
    .disabled {
      ${tw`bg-gray-400 border-gray-400 pointer-events-none`}
    }
    details {
      ${tw`border border-gray-300 bg-white my-8`}
    }
    details > * {
      ${tw`mx-4`}
    }
    details > summary {
      ${tw`bg-gray-200 hover:bg-gray-300 text-lg p-4 text-left cursor-pointer outline-none border-0 border-l-2 border-b border-gray-600 block m-0`}
    }
    details > summary::after {
      content: '\\2795';
      ${tw`float-right text-xl`}
    }
    details[open] > summary::after {
      content: '\\2796';
    }
    summary::-webkit-details-marker {
      display: none;
    }
  `,
];

const Main = ({ body, fieldStaffContact, title, location }) => {
  const content = body.processed
    .replace(/(src|href)(=['"]?)https?:\/\/www\.dvrpc\.org/g, "$1$2")
    .replace(
      /\/sites\/default\/files\//g,
      "https://cms.dvrpc.org/sites/default/files/"
    );
  return (
    <>
      <Helmet titleTemplate="%s | DVRPC">
        <title>{title}</title>
        <meta name="description" content={body.summary} />
      </Helmet>
      <main css={styles}>
        <h1>{title}</h1>
        <article
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        <div tw="md:flex justify-between border-solid border-0 border-t border-gray-400">
          <Avatar contact={fieldStaffContact} />
          <ConnectWithUs
            title={title}
            location={`https://www.dvrpc.org${location}`}
          />
        </div>
      </main>
    </>
  );
};

Main.propTypes = {
  body: PropTypes.object,
  fieldStaffContact: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.string,
};

export default Main;
