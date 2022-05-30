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
  const [focused, setFocused] = useState(false);

  const updateText = (e: any) => {
    const { key } = e;
    
    if (key === "Enter") {
      update(title);
      setFocused(false);
    } 
    else if (key === "Esc") {
      setFocused(false);
    }
  }

  return(
    <div className={focused ? styles.todoFocused : styles.todo}>
      <input type="checkbox" id="something" value="something" className={styles.checkbox} />
      <input className={styles.todoText} type="text" onBlur={() => setFocused(false)} onFocus={()=>setFocused(true)} onChange={(e) => setTitle(e.target.value)} onKeyPress={updateText} defaultValue={`${title} status: ${status}`}/>
    </div>
  );
}

export default ToDo;
