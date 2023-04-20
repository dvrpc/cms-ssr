import React from "react";

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

DefaultPage.propTypes = {
  body: "",
  title: "",
  navItem: {
    href: "",
    link: "",
    links: [],
    parent: Object,
  },
  location: "",
  staffContact: {
    name: "",
    title: "",
    mail: "",
  },
};

export default DefaultPage;
