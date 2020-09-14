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
      ${tw`border border-solid border-gray-400 mx-16 my-8`};
    }
    a {
      ${tw`underline`};
      color: inherit;
    }
    h1 {
      ${tw`mt-0 text-3xl font-bold`};
      color: ${(props) => props.theme.h1};
    }
    h2 {
      ${tw`font-bold text-xl my-4 clear-both`};
      color: ${(props) => props.theme.h2};
    }
    h3 {
      ${tw`font-bold text-lg my-4`};
      color: ${(props) => props.theme.h3};
    }
    p {
      ${tw`my-4`};
    }
    p.lead {
      ${tw`text-lg`};
    }
    .size-medium {
      ${tw`w-1/2 ml-4`};
    }
    .fright,
    .alignright {
      ${tw`float-right m-0 ml-8`};
    }
    .fleft,
    .alignleft {
      ${tw`float-left m-0 mr-8`};
    }
    figure {
      ${tw`max-w-sm rounded border border-solid border-gray-400 p-1 bg-white italic`}
    }
    img {
      ${tw`max-w-full`}
    }
    .sm {
      ${tw`text-sm text-red-700`}
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
