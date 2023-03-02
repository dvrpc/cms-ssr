import React from "react";

import HtmlParser from "./HtmlParser";
import Body from "./Body";
import StaffContact from "./StaffContact";

const DrupalPage = ({ data }) => {
  const {
    documents,
    images,
    navItem,
    nodePage: { body, title, path, relationships },
  } = data;

  return (
    <>
      <Body title={title} menu={navItem}>
        <HtmlParser html={body?.processed ?? ""} data={data} />
      </Body>
      <StaffContact
        staffContact={relationships?.field_staff_contact ?? {}}
        title={title}
        location={path.alias}
      />
    </>
  );
};

export default DrupalPage;
