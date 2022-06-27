import React from "react";
import styles from "./note.module.scss";
import utils from "../../../utils/utils"

interface PropTypes {
  title: string;
  text: string;
  tags: Array<any>;
  updatedAt: string;
}

const Note = ({ title, text, tags, updatedAt }: PropTypes) => (
  <div className={styles.note}>
    <div className={styles.noteInner}>
      <p>{title}</p>
      <p>{text}</p>
      <p className="floatLeft">{tags.toString()}</p>
      <p className="floatRight">{utils.dateToString(updatedAt)}</p>
    </div>
  </div>
);

export default Note;
