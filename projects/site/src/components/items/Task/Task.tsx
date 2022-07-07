import { Tag, Task as TaskModel, TaskState } from "common";
import React, { useState } from "react";

interface PropTypes {
  TaskData: TaskModel;
  update: (
    title: string,
    state: TaskState,
    taskID: string,
    errorCallback: Function,
    tags?: Array<Tag>,
  ) => void;
}

const Task = ({ TaskData, update }: PropTypes) => {
  const [text, setText] = useState(TaskData.title);
  const [focused, setFocused] = useState(false);
  const [checked, setChecked] = useState(TaskData.state === TaskState.DONE);

  /* When done editing callback to update Task */
  const updateText = (toUpdate: boolean, newText: string) => {
    if (toUpdate && text !== newText) {
      setText(newText);
      update(newText, TaskData.state, TaskData._id!, errorCallback, TaskData.tags);
      setFocused(false);
    }
  };

  /* When updating status callback to update Task */
  const updateStatus = (e: any) => {
    const updatedChecked = e.target.checked;
    setChecked(updatedChecked);
    update(
      text,
      updatedChecked ? TaskState.DONE : TaskState.TODO,
      TaskData._id!,
      errorCallback,
      TaskData.tags,
    );
  };

  /* Error Callback for API response */
  const errorCallback = () => {
    setChecked(TaskData.state === TaskState.DONE);
    setText(TaskData.title);
  };

  return (
    <div className={focused ? "todoFocused" : "todo"}>
      <input type="checkbox" checked={checked} onChange={updateStatus} className="checkbox" />
      <span
        role="textbox"
        aria-label="click to edit todo"
        className={checked ? "todoDone" : "todoText"}
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
      <p className="todoReminder">
        {TaskData.due ? /* `${utils.daysTillDue(due)} */ `${TaskData.due} days` : ""}
      </p>
    </div>
  );
};

export default Task;
