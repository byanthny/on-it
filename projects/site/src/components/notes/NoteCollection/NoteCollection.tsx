import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri"
import Button from "../../interactive/Button/Button";
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

    const [open, setOpen] = useState(true);
        
      return (
        <div>
            <h2>{collectionTitle}<Button variant="transparent" onClickFunction={()=>setOpen(!open)}>{open ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}</Button></h2>
            <div className={`${styles.noteCollection} ${open? "" : styles.noteCollectionClosed}`}>
                {notesList}
            </div>
        </div>
      );
}

export default NoteCollection;