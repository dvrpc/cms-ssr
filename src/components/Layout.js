import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import GlobalStyles from "./GlobalStyles";
import tw, { css } from "twin.macro";
import Menu, { RootNav } from "./MenuJson";
import Header from "./Header";
import Icon from "./Icon";
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
      <nav
        tw="flex justify-center"
        css={(props) => css`
          background-color: ${props.theme.bgPrimary};
          color: ${props.theme.infoColor};
        `}
      >
        <div tw="container flex-auto md:flex py-4 divide-x" css={css`border-color: rgba(255,255,255,.45)`}>
          <RootNav data={menu} />
        </div>
      </nav>
      <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
        <div tw="md:order-2 md:col-span-2">
          <Main body={body} title={title} />
        </div>
        <div tw="md:order-1 md:col-span-1 md:mt-20 flex flex-col items-end">
          <Menu data={menu} />
          <aside
            css={css`
              border-top-width: 2px;
              border-image: linear-gradient(to left, #aaa, #fff) 1;
            `}
            tw="pt-4"
          >
            <div tw="flex flex-1 gap-4">
              <a href="https://www.dvrpc.org/Calendar/" tw="block flex-1">
                <Icon
                  css={css`
                    background-position: -296.6px 0;
                    width: 37px;
                    height: 36px;
                    display: block;
                    margin: 0 auto 0.25rem;
                  `}
                />
                Events
              </a>
              <a href="https://www.dvrpc.org/News/" tw="block flex-1">
                <Icon
                  css={css`
                    background-position: -259.6px 0;
                    width: 37px;
                    height: 36px;
                    display: block;
                    margin: 0 auto 0.25rem;
                  `}
                />
                News
              </a>
              <a href="https://www.dvrpc.org/Data/" tw="block flex-1">
                <Icon
                  css={css`
                    background-position: -223.2px 0;
                    width: 36.5px;
                    height: 36px;
                    display: block;
                    margin: 0 auto 0.25rem;
                  `}
                />
                Releases
              </a>
            </div>
          </aside>
        </div>
      </div>
      <div tw="bg-gray-300">
        <div tw="container mx-auto grid sm:grid-cols-1 md:grid-cols-3 gap-12">
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
