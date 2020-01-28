import React from "react";
import PropTypes from "prop-types";

const Avatar = ({ contact }) => {
  return (
    <footer className="w-50 py-4 cf">
      <a className="block" href={`mailto:${contact.mail}`}>
        {contact.fieldDisplayName}
      </a>
      <small className="block text-sm">{contact.fieldTitle}</small>
    </footer>
  );
};

Avatar.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Avatar;
