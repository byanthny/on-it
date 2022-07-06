import { Task, TaskState } from "common";
import React, { useState } from "react";
import styles from "./task.module.scss";

interface PropTypes {
  TaskData: Task;
  update: Function;
}

const ToDo = ({ TaskData, update }: PropTypes) => {
  const [text, setText] = useState(TaskData.title);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState(TaskData.state === TaskState.DONE);

  /* When done editing callback to update Task */
  const updateText = (toUpdate: boolean, newText: string) => {
    if (toUpdate) {
      setText(newText);
      update(newText, TaskData.state);
      setFocused(false);
    }
  };

  /* When updating status callback to update Task */
  const updateStatus = (e: any) => {
    const updatedChecked = e.target.checked;
    setChecked(updatedChecked);
    update(text, updatedChecked ? TaskState.DONE : TaskState.TODO);
  };

  return (
    <div className={focused ? styles.todoFocused : styles.todo}>
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
      <p className={styles.todoReminder}>
        {TaskData.due ? /* `${utils.daysTillDue(due)} */ `${TaskData.due} days` : ""}
      </p>
    </div>
  );
};

export default ToDo;
