import React from "react";
import PropTypes from "prop-types";

import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";

const DefaultPage = ({ body, title, navItem, location, staffContact }) => {
  return (
    <>
      <Body title={title} menu={navItem}>
        <HtmlParser html={body ?? ""} />
      </Body>
      <StaffContact
        staffContact={staffContact}
        title={title}
        location={location}
      />
    </>
  );
};

DefaultPage.props = {
  body: PropTypes.string,
  title: PropTypes.string,
  navItem: PropTypes.shape({
    href: PropTypes.string,
    link: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.object),
    parent: PropTypes.object,
  }),
  location: PropTypes.string,
  staffContact: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    mail: PropTypes.string,
  }),
};

export default DefaultPage;
