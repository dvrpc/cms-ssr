import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import GlobalStyles from "./GlobalStyles";
import tw, { css } from "twin.macro";
import Menu from "./MenuJson";
import Header from "./Header";
import Infobar from "./Infobar";
import Main from "./Main";
import Avatar from "./Avatar";
import ConnectWithUs from "./ConnectWithUs";
import Footer from "./Footer";
import favicon from "../images/favicon.ico";

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
          <Main body={body} title={title} />
        </div>
        <div tw="md:order-1 md:col-span-1 md:my-10">
          <Menu data={menu} />
        </div>
      </div>
      <div tw="bg-gray-300">
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-4">
          <div tw="md:col-span-2 md:col-start-2 px-4 md:flex justify-between items-center">
            <Avatar contact={staffContact} />
            <ConnectWithUs
              title={title}
              location={`https://www.dvrpc.org${location}`}
            />
          </div>
        </div>
      </div>
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
