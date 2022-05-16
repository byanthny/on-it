import React from "react";
import styles from "./ToDo.module.scss";

interface PropTypes {
  text: string;
  status: string;
}

const ToDo = ({text, status}:  PropTypes) => (
  <div className={styles.todo}>
    <input type="checkbox" id="something" value="something" className={styles.checkbox} />
    <p>{`${text} status: ${status}`}</p>
  </div>
);

export default ToDo;
