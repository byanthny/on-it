import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

const Navbar = () => (
    <div className={styles.navbar}>
        <Link to="/">home</Link>
        <Link to="/todo">todo</Link>
        <button type="button">+</button>
        <Link to="/notes">notes</Link>
        <Link to="/settings">settings</Link>
    </div>
);

export default Navbar;