import React from "react";
import { Link } from "react-router-dom";
import {
  RiSettings3Fill,
  RiHomeFill,
  RiStickyNoteFill,
  RiCheckboxFill,
  RiAddFill,
} from "react-icons/ri";
import styles from "./navbar.module.scss";

const Navbar = () => (
  <div className={styles.navbar}>
    <div className={styles.innerbox}>
      <Link aria-label="home" to="/">
        <RiHomeFill />
      </Link>
      <Link aria-label="to do" to="/todo">
        <RiCheckboxFill />
      </Link>
      <button aria-label="add" type="button" onClick={() => {}}>
        <div className={styles.buttonwrapper}>
          <div className={styles.buttonfixed}>
            <RiAddFill />
          </div>
        </div>
      </button>
      <Link aria-label="notes" to="/notes">
        <RiStickyNoteFill />
      </Link>
      <Link aria-label="settings" to="/settings">
        <RiSettings3Fill />
      </Link>
    </div>
  </div>
);

export default Navbar;
