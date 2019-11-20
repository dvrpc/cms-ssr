import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ contact }) => {
  const fieldPhoto = contact.fieldPhoto || {};
  return (
    <footer className="w-50 py-4 cf">
      <img
        className="h-16 w-16 br-100 fl mr-4"
        src={
          fieldPhoto.url ||
          "https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg"
        }
        alt={fieldPhoto.alt || "avatar"}
      />
      <a className="block" href={`mailto:${contact.mail}`}>
        {contact.fieldDisplayName}
      </a>
      <small className="block text-sm">{contact.fieldTitle}</small>
    </footer>
  );
};

Avatar.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Avatar;
