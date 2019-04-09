import React from "react";

const Avatar = ({ contact }) => {
  const fieldPhoto = contact.fieldPhoto || {};
  return (
    <footer className="w-50 pv3 cf">
      <img
        className="h3 w3 br-100 fl mr3"
        src={
          fieldPhoto.url ||
          "https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg"
        }
        alt={fieldPhoto.alt || "avatar"}
      />
      <a className="db" href={`mailto:${contact.fieldEmail}`}>
        {contact.name}
      </a>
      <small className="db f6">{contact.fieldTitle}</small>
    </footer>
  );
};
export default Avatar;
