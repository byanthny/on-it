import { Note, Task, TaskState } from "common";
import React, { useState } from "react";
import Button from "../items/Button";

type PropTypes = {
  handleSubmit: (itemType: string, data: Task | Note) => void;
};

const CreateForm = ({ handleSubmit }: PropTypes) => {
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const submit = (e: any) => {
    e.preventDefault();
    const itemType = description.length < 1 ? "task" : "note";

    let data: Task | Note;

    if (itemType === "task") {
      data = {
        uid: "",
        state: checked ? TaskState.DONE : TaskState.TODO,
        title,
      };
    } else if (itemType === "note") {
      data = {
        uid: "",
        parent: "",
        title,
        text: description,
        tags: [],
        updated: "",
      };
    } else {
      return;
    }

    handleSubmit(itemType, data);
  };

  return (
    <form className="createForm">
      <div className="task">
        {description.length < 1 && (
          <input
            type="checkbox"
            defaultChecked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="checkbox"
          />
        )}
        <input type="text" placeholder="title" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        placeholder="give a description to turn into a note"
      />
      <p>placeholder for other features</p>
      <br />
      <Button variant="light" onClick={(e) => submit(e)} submitButton>
        done
      </Button>
    </form>
  );
};

export default CreateForm;
