import React from "react";
import NewsLetterSection from "./NewsLetterSection";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <>
      <NewsLetterSection />
      {children}
      <NavBar />
    </>
  );
};

export default Layout;