import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { css } from "styled-components/macro";
import tw from "tailwind.macro";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";

const styles = css`
  ${tw`mx-4 mt-8`}
  width: 80ch;

  hr {
    ${tw`border-solid border-gray-400 m-8`};
  }
  a {
    ${tw`underline`};
    color: inherit;
  }
  h2 {
    ${tw`font-bold text-xl my-4`};
    color: var(--color-h2);
  }
  h3 {
    ${tw`font-bold text-lg my-4`};
    color: var(--color-h3);
  }
  p {
    ${tw`my-4`};
  }
  .size-medium {
    ${tw`w-1/2 ml-4`};
  }
  .alignright {
    ${tw`float-right`};
  }
  img {
    ${tw`max-w-full`}
  }
`;

const Main = ({ body, fieldStaffContact, title, location }) => {
  return (
    <>
      <Helmet titleTemplate="%s | DVRPC">
        <title>{title}</title>
        <meta name="description" content={body.summaryProcessed} />
      </Helmet>
      <main css={styles}>
        <h1 css={tw`mt-0`}>{title}</h1>
        <article dangerouslySetInnerHTML={{ __html: body.processed }} />
        <div
          css={css`
            ${tw`flex justify-between border-t`}
            border-color: #aaa;
          `}
        >
          <Avatar contact={fieldStaffContact.entity} />
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
