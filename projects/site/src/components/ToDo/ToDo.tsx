import React, { useState } from "react";
import styles from "./ToDo.module.scss";

interface PropTypes {
  title: string;
  status: string;
  update: Function;
  reminder: string
}
const ToDo = ({title, status, update, reminder}:  PropTypes) => {

  const [text, setText] = useState(title);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState((status === "done"));

  const daysTillDue = Math.ceil(((new Date(reminder).getTime()) - Date.now())/(1000*60*60*24));

  const updateText = (e: any) => {
    const { key } = e;
    
    if (key === "Enter") {
      update(text, status);
      setFocused(false);
      // TODO unfocus input
    }
  }

  const updateStatus = (e: any) => {
    const updatedChecked = e.target.checked
    setChecked(updatedChecked);
    update(text, updatedChecked ? "done" : "todo")
  }

  return(
    <div className={focused ? styles.todoFocused : styles.todo}>
      <input type="checkbox" defaultChecked={checked} onChange={updateStatus} className={styles.checkbox} />
      <input className={checked ? styles.todoDone : styles.todoText} type="text" onBlur={() => setFocused(false)} onFocus={()=>setFocused(true)} onChange={(e) => setText(e.target.value)} onKeyPress={updateText} defaultValue={`${text}`} />
      <p className={styles.todoReminder}>{`in ${daysTillDue} days`}</p>
    </div>
  );
}

export default ToDo;
