/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import styles from "./ToDo.module.scss";

interface PropTypes {
  text: string;
  status: string;
  update: Function;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ToDo = ({text, status, update}:  PropTypes) => {

  const [title, setTitle] = useState(text);

  const updateText = (e: any) => {
    if (e.key === "Enter") {
      update(title);
    }
  }

  return(
    <div className={styles.todo}>
      <input type="checkbox" id="something" value="something" className={styles.checkbox} />
      <input className={styles.todoText} type="text" onChange={(e) => setTitle(e.target.value)} onKeyPress={updateText} defaultValue={`${title} status: ${status}`}/>
    </div>
  );
}

export default ToDo;
