import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import tw, { css } from "twin.macro";

import "balloon-css";

const styles = [
  tw`mx-4 my-8`,
  (props) => css`
    --balloon-text-color: #000;
    --balloon-color: #ddd;
    --balloon-font-size: 15px;
    max-width: 80ch;

    [aria-label]::after {
      width: 65ch;
      white-space: unset;
    }

    hr {
      ${tw`border-t border-solid border-gray-400 my-8`}
    }
    a {
      ${tw`underline`}
      color: inherit;
    }
    h1 {
      ${tw`mt-0 text-3xl font-bold`}
      color: ${props.h1};
    }
    h2 {
      ${tw`font-bold text-2xl my-4 clear-both`}
      color: ${props.h2};
    }
    h3 {
      ${tw`font-bold text-lg my-4`}
      color: ${props.h3};
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
    ol[type="A"] {
      list-style: upper-alpha;
    }
    ul {
      ${tw`pl-10 my-4 list-disc`}
    }
    table {
      ${tw`not-italic`}
    }
    thead {
      ${tw`align-bottom`}
    }
    tbody {
      ${tw`border-t-2 border-b-2 border-gray-300`}
    }
    th,
    td {
      ${tw`border-b border-gray-300 px-2 py-1`}
    }
    .list-group {
      ${tw`pl-0`}
    }
    .size-medium {
      ${tw`max-w-xl ml-4`}
    }
    .fright,
    .alignright {
      ${tw`float-right clear-right mr-0 ml-8`}
    }
    .fleft,
    .alignleft {
      ${tw`float-left clear-left ml-0 mr-8`}
    }
    .clear-left {
      ${tw`clear-left`}
    }
    .clear-right {
      ${tw`clear-right`}
    }
    .clear-both {
      ${tw`clear-both`}
    }
    .group__inner-container {
      ${tw`flex flex-wrap`}
    }
    figure {
      ${tw`table max-w-sm rounded border border-solid border-gray-400 p-1 mb-4 bg-white italic`}
    }
    figcaption {
      ${tw`p-2 pt-1 table-caption text-sm`}
      caption-side: bottom;
    }
    .simple > figure {
      ${tw`rounded-none p-0 bg-transparent border-none`}
    }
    .simple figcaption {
      ${tw`pl-0 pb-0`}
    }
    img {
      ${tw`max-w-full block`}
    }
    .alignfull {
      ${tw`max-w-full mx-auto`}
    }
    .text-center {
      ${tw`text-center`}
    }
    .sm {
      ${tw`text-sm text-red-700`}
    }
    .buttons {
      ${tw`flow-root`}

      &>div {
        ${tw`float-left mr-8`}
      }
    }
    .button a,
    .btn a,
    button.btn {
      ${tw`inline-block no-underline text-center align-middle border-solid border-0 border-transparent py-2 px-3 rounded transition duration-150 ease-in-out`}

      &:hover {
        background-image: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.1),
          rgba(0, 0, 0, 0.1)
        );
      }
    }
    .button a,
    .btn-primary a,
    button.btn {
      background-color: #0078ae;
      ${tw`text-white`}
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
      ${tw`bg-gray-200 hover:bg-gray-300 text-lg p-4 pr-14 text-left cursor-pointer outline-none border-0 border-l-2 border-b border-gray-600 block m-0 relative`}
    }
    details > summary::after {
      content: "\\2795";
      ${tw`absolute text-xl top-4 right-4`}
    }
    details[open] > summary::after {
      content: "\\2796";
    }
    summary::-webkit-details-marker {
      display: none;
    }
    .list-group {
      background-color: #fdfeff;
      border-radius: 2px;
      border: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08),
        0 2px 5px 0 rgba(0, 0, 0, 0.06);
      padding: 0;
      overflow: hidden;
      margin-bottom: 20px;

      & > .footer,
      & > footer {
        margin: 0 -18px -18px;
        padding: 4.5px 18px;
        background-color: #f7f7f7;
        text-align: right;
        border-top: 1px solid #eee;
        font-weight: 700;
      }
      & > li {
        position: relative;
        display: block;
        padding: 10px 15px;
        margin-bottom: -1px;
        background-color: #fdfeff;
        border: 1px solid #ddd;
      }
    }
    .list-group-heading:first-of-type,
    .list-group-item:first-of-type {
      border-top-right-radius: 2px;
      border-top-left-radius: 2px;
    }
    .list-group-heading:last-child,
    .list-group-item:last-child {
      margin-bottom: 0;
      border-bottom-right-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    .list-group-heading {
      color: #717171;
      text-transform: uppercase;
      font-size: 13px;
      font-weight: 700;
    }
    a.list-group-item {
      color: #555;
    }
    a.list-group-item .list-group-item-heading {
      color: #333;
    }
    a.list-group-item:focus,
    a.list-group-item:hover {
      text-decoration: none;
      color: #555;
      background-color: #f5f5f5;
    }
    .list-group-item.disabled,
    .list-group-item.disabled:focus,
    .list-group-item.disabled:hover {
      background-color: #ddd;
      color: #717171;
      cursor: disabled;
    }
    .list-group-item.disabled .list-group-item-heading,
    .list-group-item.disabled:focus .list-group-item-heading,
    .list-group-item.disabled:hover .list-group-item-heading {
      color: inherit;
    }
    .list-group-item.disabled .list-group-item-text,
    .list-group-item.disabled:focus .list-group-item-text,
    .list-group-item.disabled:hover .list-group-item-text {
      color: #717171;
    }
    .list-group-item.active,
    .list-group-item.active:focus,
    .list-group-item.active:hover {
      z-index: 2;
      color: #fff;
      background-color: ${props.h1};
      border-color: ${props.h1};
    }
    .list-group-item.active .list-group-item-heading,
    .list-group-item.active .list-group-item-heading > .small,
    .list-group-item.active .list-group-item-heading > small,
    .list-group-item.active:focus .list-group-item-heading,
    .list-group-item.active:focus .list-group-item-heading > .small,
    .list-group-item.active:focus .list-group-item-heading > small,
    .list-group-item.active:hover .list-group-item-heading,
    .list-group-item.active:hover .list-group-item-heading > .small,
    .list-group-item.active:hover .list-group-item-heading > small {
      color: inherit;
    }
    .list-group-item.active .list-group-item-text,
    .list-group-item.active:focus .list-group-item-text,
    .list-group-item.active:hover .list-group-item-text {
      color: #7bd6ff;
    }
    .list-group-item-heading {
      margin-top: 0;
      margin-bottom: 5px;
    }
    .list-group-item-text {
      margin-bottom: 0;
      line-height: 1.3;
    }
    .card {
      background-color: #fdfeff;
      border-radius: 2px;
      border: none;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08),
        0 2px 5px 0 rgba(0, 0, 0, 0.06);
      padding: 18px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .card > h2:first-of-type {
      margin: -18px -18px 0;
      padding: 9px 18px;
      background-color: ${props.h2};
      color: #fff;
    }
    .card > h3:first-of-type {
      margin: -18px -18px 0;
      padding: 9px 18px;
      background-color: ${props.h3};
      color: #fff;
    }
    .card > h2:first-of-type + *,
    .card > h3:first-of-type + * {
      margin-top: 0;
    }
    .card > .footer,
    .card > footer {
      margin: 0 -18px -18px;
      padding: 4.5px 18px;
      background-color: #f7f7f7;
      text-align: right;
      border-top: 1px solid #eee;
      font-weight: 700;
    }
    .card .list-group {
      margin-left: -18px;
      margin-right: -18px;
      box-shadow: none;
    }
    .card .list-group > .list-group-heading,
    .card .list-group > .list-group-item {
      border-radius: 0;
      border-left-width: 0;
      border-right-width: 0;
    }
    .card :first-of-type + .list-group {
      margin-top: 0;
    }
    .card .list-group:last-child {
      margin-bottom: -18px;
    }
    .list-group > h2:first-of-type {
      margin: 0;
      padding: 9px 18px;
      background-color: ${props.h2};
      color: #fff;
    }
    .list-group > h3:first-of-type {
      margin: 0;
      padding: 9px 18px;
      background-color: ${props.h3};
      color: #fff;
    }
    label {
      font-weight: bold;
      padding: 1rem 0 0.25rem;
      display: block;
    }
    input,
    .form-control,
    select,
    textarea {
      display: block;
      width: 100%;
      padding: 6px 12px;
      font-size: 16px;
      line-height: 1.5;
      color: rgba(0, 0, 0, 0.87);
      background-color: #fdfeff;
      background-image: none;
      border: 1px solid #ddd;
      border-radius: 2px;
      box-shadow: 0 0 4px rgb(0 0 0 / 18%);
      transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .btn[disabled] {
      background: #767676;
      cursor: progress;
    }
  `,
];

const Main = ({ body, title }) => {
  if (body === null) {
    body = { processed: "", summary: "" };
  }
  const content = body.processed.replace(
    /"\/sites\/default\/files\//g,
    '"https://cms.dvrpc.org/sites/default/files/'
  );

  const formSubmit = (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector("[type='submit']");
    submitBtn.disabled = true;
    fetch(e.target.action, {
      method: "post",
      body: new URLSearchParams(new FormData(e.target)),
    }).then(function (response) {
      if (response.ok) {
        alert(
          "Thank you for your comment. An email confirmation will be sent."
        );
        e.target.reset();
      } else {
        alert(
          "There was a problem submitting your comment. Please contact public_affairs@dvrpc.org for assistance.\n\nWe apologize for the inconvenience."
        );
      }
      submitBtn.disabled = false;
    });
  };

  React.useEffect(() => {
    document.body.addEventListener("submit", formSubmit);

    return () => document.body.removeEventListener("submit", formSubmit);
  }, []);
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
      </main>
    </>
  );
};

Main.propTypes = {
  body: PropTypes.object,
  title: PropTypes.string,
};

export default Main;
