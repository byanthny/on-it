import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OnItApi from "../../../services/OnItApi";

type PropTypes = {
    noteID: string,
    onClose: Function
};

const EditNote = ({noteID, onClose}:PropTypes) => {

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


    return (
        <div className="noteEditor">
        <h1>{title}</h1>
        <p>{text}</p>
        <button className="button" type="button" onClick={()=>onClose(false)}>close</button>
        </div>
    )

}

export default EditNote;