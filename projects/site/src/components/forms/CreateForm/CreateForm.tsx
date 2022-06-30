import React, { useState } from "react";
import Button from "../../interactive/Button/Button";
import styles from "./createForm.module.scss"
import checkboxStyles from "../../items/Task/task.module.scss";

const CreateForm = () => {
const [checked, setChecked] = useState(false);
const [description, setDescription] = useState("");

    return (
    <div className={styles.createForm}>
        <div className={styles.task}>
            {description.length < 1 && <input
            type="checkbox"
            defaultChecked={checked}
            onChange={(e)=>setChecked(e.target.checked)}
            className={`${checkboxStyles.checkbox} ${styles.checkbox}`}
            />}
            <input type="text" placeholder="title"/>
        </div>
        <input type="text" onChange={(e)=>setDescription(e.target.value)} placeholder="give a description to turn into a note"/>
        <p>placeholder for other features</p>
        <br/>
        <Button variant="light" onClickFunction={()=>{}}>done</Button>
    </div>
);
    }

export default CreateForm;