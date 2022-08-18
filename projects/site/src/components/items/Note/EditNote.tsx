import React, { useCallback } from "react";
import { Note } from "common";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type PropTypes = {
    noteData: Note,
    setNoteData: Function,
};

const EditNote = ({noteData, setNoteData}:PropTypes) => {

    const onChange = useCallback((value: string) => {
        setNoteData({...noteData, text: value});
    }, []);

    return (
        <div className="noteEditor">
            <h1>{noteData.title}</h1>
            <SimpleMDE value={noteData.text} onChange={onChange} />
        </div>
    )

}

export default EditNote;