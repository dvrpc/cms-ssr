import React from "react";
import "./Avatar.css";

const Avatar = ({ contact }) => {
  return (
    <footer className="Avatar">
      {contact.fieldPhoto ? (
        <img src={contact.fieldPhoto.url} alt={contact.fieldPhoto.alt} />
      ) : (
        <img
          src="https://utulsa.edu/wp-content/uploads/2018/08/generic-avatar.jpg"
          alt="avatar"
        />
      )}
      <a href={`mailto:${contact.fieldEmail}`}>{contact.name}</a>
      <small>{contact.fieldTitle}</small>
    </footer>
  );
};
export default Avatar;
