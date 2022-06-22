import React from "react";
import Note from "../Note/Note"
import styles from "./noteCollection.module.scss"

interface PropTypes {
    data: Array<any>
    collectionTitle: string
}

const NoteCollection = ({data, collectionTitle}:PropTypes) => {

    const notesList = data.map(({ title, text, tags, updatedAt }) => (
        <Note title={title} text={text} tags={tags} updatedAt={updatedAt} />
      ));
        
      return (
        <div>
            <h2>{collectionTitle}</h2>
            <div className={styles.noteCollection}>
                {notesList}
            </div>
        </div>
      );
}

export default NoteCollection;