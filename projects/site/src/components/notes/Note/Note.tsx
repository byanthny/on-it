import React from "react";
import styles from "./note.module.scss";

interface PropTypes {
  title: string;
  text: string;
  tags: Array<any>;
  updatedAt: string;
}

const Note = ({ title, text, tags, updatedAt }: PropTypes) => (
  <div className={styles.note}>
    <div>
      <p>{title}</p>
      <p>{text}</p>
      <p>{tags.toString()}</p>
      <p>{updatedAt}</p>
    </div>
  </div>
);

export default Note;
