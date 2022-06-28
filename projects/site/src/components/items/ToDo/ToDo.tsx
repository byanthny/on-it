import React, { useState } from "react";
import styles from "./ToDo.module.scss";
// import utils from "../../../utils/utils";

interface PropTypes { // TODO Use extended Task interface
  title: string,
  status: string,
  update: Function,
  due?: number,
  key: string
}

const ToDo = ({ title, status, update, due = undefined, key }: PropTypes) => {
  const [text, setText] = useState(title);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState(status === "done");

  const updateText = (toUpdate: boolean, newText: string) => {
    if (toUpdate) {
      setText(newText);
      update(newText, status);
      setFocused(false);
    }
  };

  const updateStatus = (e: any) => {
    const updatedChecked = e.target.checked;
    setChecked(updatedChecked);
    update(text, updatedChecked ? "done" : "todo");
  };

  return (
    <div key={key} className={focused ? styles.todoFocused : styles.todo}>
      <input
        type="checkbox"
        defaultChecked={checked}
        onChange={updateStatus}
        className={styles.checkbox}
      />
      <span
        role="textbox"
        aria-label="click to edit todo"
        className={checked ? styles.todoDone : styles.todoText}
        onBlur={(e) => {
          setFocused(false);
          updateText(true, e.currentTarget.innerText);
        }}
        onFocus={() => setFocused(true)}
        onKeyPress={(e) => updateText(e.key === "Enter", e.currentTarget.innerText)}
        tabIndex={0}
        contentEditable={focused}
      >
        {text}
      </span>
      <p className={styles.todoReminder}>{due ? /* `${utils.daysTillDue(due)} */ `${due} days` : ""}</p>
    </div>
  );
};

export default ToDo;
