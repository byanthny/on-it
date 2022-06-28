import React from "react";
import styles from "./note.module.scss";
import utils from "../../../utils/utils"

interface PropTypes {
  title: string;
  text: string;
  tags: Array<any>;
  updatedAt: string;
  key: string
}

const Note = ({ title, text, tags, updatedAt, key }: PropTypes) => {

  // TODO if showing tags how to handle overflow
  /*   const tagsToString = () => {
    const tagsString = tags.map((t:any) => (
        t.name
      )
    );
    return tagsString
  } */

  const tagCountString = () =>
    `${tags.length} ${tags.length > 1 ? "Tags" : "Tag"}`

  return (
  <div key={key} className={styles.note}>
    <div className={styles.noteInner}>
      <p>{title}</p>
      <p>{text}</p>
      <p className="floatLeft">{tagCountString()}</p>
      <p className="floatRight">{utils.dateToString(updatedAt)}</p>
    </div>
  </div>);
};

export default Note;
