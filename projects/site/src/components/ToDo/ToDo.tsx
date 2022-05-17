import React from "react";
import styles from "./ToDo.module.scss";

const ToDo = () => (
  <div className={styles.todo}>
    <p>
      <input type="checkbox" id="something" value="something" />
      Task
    </p>
  </div>
);

export default ToDo;
