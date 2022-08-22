import React from "react";
import { RiSearchLine } from "react-icons/ri";

interface PropTypes {
  title: string;
}

const Header = ({ title }: PropTypes) => (
  <div className="header">
    <h1>{title}</h1>
    <a aria-label="search" href="/#">
      <RiSearchLine />
    </a>
  </div>
);

export default Header;
