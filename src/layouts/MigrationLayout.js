import React from "react";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MigrationLayout = ({ children }) => {
  return (
    <>
      <style>
        {`:root {
          --color-h1: #0078ae;
          --color-h2: #0078ae;
          --color-h3: #0078ae;
          --color-highlight: #0078ae;
          --bg-cover-image: url(https://cdn.dvrpc.org/sites/default/files/2020-09/philly1_0.jpg);
          --content-photo-credits: "";
          --height-banner: 400px;
        }`}
      </style>
      <Header />
      <Body>{children}</Body>
      <Footer />
    </>
  );
};

export default MigrationLayout;
