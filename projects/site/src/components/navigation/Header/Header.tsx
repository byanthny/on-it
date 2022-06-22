import React from "react";
import { RiSearchLine } from "react-icons/ri";
import styles from "./header.module.scss";

interface PropTypes {
  title: string;
}

const Header = ({ title }: PropTypes) => (
  <div className={styles.header}>
    <h1>{title}</h1>
    <a aria-label="search" href="/#" className={styles.searchIcon}>
      <RiSearchLine />
    </a>
  </div>
);

export default Header;
