import React from "react";

const Avatar = ({ name, title, mail }) => {
  return (
    <footer className="flow-root">
      <a className="block" href={`mailto:${mail}`}>
        {name}
      </a>
      <small className="block text-sm">{title}</small>
    </footer>
  );
};

export default Avatar;
