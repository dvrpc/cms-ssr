import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import tw, { css } from "twin.macro";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import TopNav from "./TopNav";
import Body from "./Body";
import StaffContact from "./StaffContact";
import Footer from "./Footer";
import favicon from "../images/favicon.ico";

const Layout = ({ location, title, body, staffContact, menu, children }) => {
  return (
    <>
      <Helmet>
        <html lang="en" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <GlobalStyles />
      <Header />
      <TopNav menu={menu} />
      {children ? children : <Body body={body} title={title} menu={menu} />}
      <StaffContact
        staffContact={staffContact}
        title={title}
        location={location}
      />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  body: PropTypes.object,
  staffContact: PropTypes.object,
  title: PropTypes.string,
  location: PropTypes.string,
  menu: PropTypes.object,
};

export default Layout;
