import React from "react";
import { Note as NoteModel } from "common";
import { dateToString } from "../../../utils/utils";

type PropTypes = {
  NoteData: NoteModel;
};

const Note = ({ NoteData }: PropTypes) => {
  // TODO if showing tags how to handle overflow
  const tagCountString = () =>
    NoteData.tags ? `${NoteData.tags.length} ${NoteData.tags.length > 1 ? "Tags" : "Tag"}` : "0 Tags";

  return (
    <div className="note">
      <div className="noteInner">
        <p>{NoteData.title}</p>
        <p>{NoteData.text}</p>
        <p className="floatLeft">{tagCountString()}</p>
        <p className="floatRight">{NoteData.updated && dateToString(NoteData.updated.toString())}</p>
      </div>
    </div>
  );
};

export default Note;
