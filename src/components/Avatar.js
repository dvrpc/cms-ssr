import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components/macro";
import tw from "twin.macro";

const Avatar = ({ contact }) => {
  return (
    <footer css={tw`w-2/4 py-4 clearfix`}>
      <a css={tw`block`} href={`mailto:${contact.name}`}>
        {contact.field_display_name}
      </a>
      <small css={tw`block text-sm`}>{contact.field_title}</small>
    </footer>
  );
};

Avatar.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Avatar;
