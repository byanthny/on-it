import React, { useState } from "react";
import styles from "./ToDo.module.scss";

interface PropTypes {
  text: string;
  status: string;
  update: Function;
}
const ToDo = ({text, status, update}:  PropTypes) => {

  const [title, setTitle] = useState(text);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState((status === "done"));


  const updateText = (e: any) => {
    const { key } = e;
    
    if (key === "Enter") {
      update(title, status);
      setFocused(false);
      // TODO unfocus input
    }
  }

  const updateStatus = (e: any) => {
    const updatedChecked = e.target.checked
    setChecked(updatedChecked);
    update(title, updatedChecked ? "done" : "todo")
  }

  return(
    <div className={focused ? styles.todoFocused : styles.todo}>
      <input type="checkbox" defaultChecked={checked} onChange={updateStatus} className={styles.checkbox} />
      <input className={checked ? styles.todoDone : styles.todoText} type="text" onBlur={() => setFocused(false)} onFocus={()=>setFocused(true)} onChange={(e) => setTitle(e.target.value)} onKeyPress={updateText} defaultValue={`${title} status: ${checked}`} />
    </div>
  );
}

export default ToDo;
