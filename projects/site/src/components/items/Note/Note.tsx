import React from "react";
import { Note as NoteModel } from "common";
import styles from "./note.module.scss";
import { dateToString } from "../../../utils/utils";

type PropTypes = {
  NoteData: NoteModel;
};

const Note = ({ NoteData }: PropTypes) => {
  // TODO if showing tags how to handle overflow
  /*   const tagsToString = () => {
    const tagsString = tags.map((t:any) => (
        t.name
      )
    );
    return tagsString
  } */

  const tagCountString = () =>
    `${NoteData.tags.length} ${NoteData.tags.length > 1 ? "Tags" : "Tag"}`;

  return (
    <div className={styles.note}>
      <div className={styles.noteInner}>
        <p>{NoteData.title}</p>
        <p>{NoteData.text}</p>
        <p className="floatLeft">{tagCountString()}</p>
        <p className="floatRight">{dateToString(NoteData.updated.toString())}</p>
      </div>
    </div>
  );
};

export default Note;