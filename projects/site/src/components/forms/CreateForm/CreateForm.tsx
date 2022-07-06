import React, { useState } from "react";
import { Note, Task, TaskState } from "common";
import Button from "../../interactive/Button/Button";
import styles from "./createForm.module.scss"
import checkboxStyles from "../../items/Task/task.module.scss";


type PropTypes = {
    handleSubmit: (itemType: string, item: Task | Note)=>{}
}

const CreateForm = ({handleSubmit}: PropTypes) => {
const [checked, setChecked] = useState(false);
const [description, setDescription] = useState("");
const [title, setTitle] = useState("");

const submit = (e:any) => {
    e.preventDefault();

    const itemType = description.length < 1 ? "todo" : "note";

    if (itemType === "todo") {
        const task: Task = {
            uid: "",
            title,
            state: checked ? TaskState.DONE : TaskState.TODO,
            // description?: string | undefined;
            // parent?: string | undefined;
            // tags?: Tag[] | undefined;
            // due?: number | Date | undefined;
            // reminders?: Date[] | ... 1 more ... | undefined;
            // pinned?: boolean | undefined
        }

        handleSubmit(itemType, task);
        return
    }

    const note: Note = {
        uid: "",
        parent: "",
        // order?: number | undefined;
        title,
        text: description,
        tags: [],
        updated: (new Date).toISOString()
    }

    handleSubmit(itemType, note)
}

    return (
    <div className={styles.createForm}>
        <div className={styles.task}>
            {description.length < 1 && <input
            type="checkbox"
            defaultChecked={checked}
            onChange={(e)=>setChecked(e.target.checked)}
            className={`${checkboxStyles.checkbox} ${styles.checkbox}`}
            />}
            <input type="text" placeholder="title" onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="give a description to turn into a note"/>
        <p>placeholder for other features</p>
        <br/>
        <Button variant="light" onClickFunction={(e)=>submit(e)}>done</Button>
    </div>
);
    }

export default CreateForm;