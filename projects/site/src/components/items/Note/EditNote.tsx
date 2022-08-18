import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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


    return (
        <div className="noteEditor">
            <h1>{title}</h1>
            <p>{text}</p>
        </div>
    )

}

export default EditNote;