import React from "react";

const Avatar = ({ contact }) => {
  return (
    <footer className="flow-root">
      <a className="block" href={`mailto:${contact.mail}`}>
        {contact.field_display_name}
      </a>
      <small className="block text-sm">{contact.field_title}</small>
    </footer>
  );
};

export default Avatar;
