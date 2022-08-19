import React, { useCallback, useMemo } from "react";
import { Note } from "common";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type PropTypes = {
    noteData: Note,
    setNoteData: Function,
};

const EditNote = ({noteData, setNoteData}:PropTypes) => {

    const options = useMemo(() => ({
        toolbar: false,
        }), []);

    const onChange = useCallback((value: string) => {
        setNoteData({...noteData, text: value});
    }, []);

    return (
        <>
        <h1>{noteData.title}</h1>
        <br/>
        <div className="noteEditor">
            <SimpleMDE value={noteData.text} options={options} onChange={onChange} />
        </div>
        </>
    )

}

export default EditNote;