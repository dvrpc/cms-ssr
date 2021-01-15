import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components/macro";
import tw, { css } from "twin.macro";
import Menu from "./MenuJson";
import Header from "./Header";
import Infobar from "./Infobar";
import Main from "./Main";
import Footer from "./Footer";
import favicon from "../images/favicon.ico";

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Public Sans,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif;
    ${tw`bg-gray-100 text-gray-900 m-0 leading-normal`}
  }
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const Layout = ({ location, title, body, staffContact, menu }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <GlobalStyles />
      <Header />
      <Infobar />
      <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        <div tw="md:order-2 md:col-span-2">
          <Main
            body={body}
            fieldStaffContact={staffContact}
            title={title}
            location={location}
          />
        </div>
        <div tw="md:order-1 md:col-span-1 md:my-10">
          <Menu data={menu} />
        </div>
      </div>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  body: PropTypes.object,
  fieldStaffContact: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.string,
  menu: PropTypes.object,
};

export default Layout;
