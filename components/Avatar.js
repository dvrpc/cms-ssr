import React from "react";
import PropTypes from "prop-types";
import { css } from "styled-components/macro";
import tw from "tailwind.macro";

const Avatar = ({ contact }) => {
  return (
    <footer css={tw`w-50 py-4 clearfix`}>
      <a css={tw`block`} href={`mailto:${contact.mail}`}>
        {contact.fieldDisplayName}
      </a>
      <small css={tw`block text-sm`}>{contact.fieldTitle}</small>
    </footer>
  );
};

Avatar.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Avatar;
