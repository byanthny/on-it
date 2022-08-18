import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import OnItApi from "../../../services/OnItApi";

type PropTypes = {
    noteID: string
};

const EditNote = ({noteID}:PropTypes) => {

    const [text, setText]  = useState("");
    const [title, setTitle] = useState("")


    const fetchData = async () => {
        try {
            const response = await OnItApi.note.get(noteID);

            if(response.error)
                throw response.error.message

            setText(response.payload!.text);
            setTitle(response.payload!.title);
        } catch (error) {
            toast(error as string);
        }
    };

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    const onChange = useCallback((value: string) => {
        setText(value);
      }, []);

    return (
        <div className="noteEditor">
            <h1>{title}</h1>
            <SimpleMDE value={text} onChange={onChange} />
        </div>
    )

}

export default EditNote;