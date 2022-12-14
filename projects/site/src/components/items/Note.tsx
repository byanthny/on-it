import React from "react";
import { Note as NoteModel } from "common";
import { dateToString } from "../../utils/utils";

type PropTypes = {
  NoteData: NoteModel;
  selectNoteToEdit: (noteID: string) => void;
};

const Note = ({ NoteData, selectNoteToEdit }: PropTypes) => {
  // TODO if showing tags how to handle overflow
  const tagCountString = () =>
    NoteData.tags
      ? `${NoteData.tags.length} ${NoteData.tags.length > 1 ? "Tags" : "Tag"}`
      : "0 Tags";

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="note"
      onClick={(e) => {
        e.preventDefault();
        selectNoteToEdit(NoteData._id!);
      }}
    >
      <div className="noteInner">
        <p>{NoteData.title}</p>
        <p>{NoteData.text}</p>
        <p className="floatLeft">{tagCountString()}</p>
        <p className="floatRight">
          {NoteData.updated && dateToString(NoteData.updated.toString())}
        </p>
      </div>
    </div>
  );
};

export default Note;
