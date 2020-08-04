import React from "react";
import PropTypes from "prop-types";
import tw from "twin.macro";

const Avatar = ({ contact }) => {
  return (
    <footer tw="py-4 clearfix">
      <a tw="block" href={`mailto:${contact.mail}`}>
        {contact.field_display_name}
      </a>
      <small tw="block text-sm">{contact.field_title}</small>
    </footer>
  );
};

Avatar.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default Avatar;
