import React, { useEffect, useReducer, useState } from "react";
import { Note as NoteModel, Tag } from "common";
import { toast } from "react-toastify";
import { toKeyValueMap } from "../utils/utils";
import OnItApi from "../services/OnItApi";
import EditNote from "../components/items/EditNote";
import Collection from "../components/items/Collection";
import NavBar from "../components/navigation/NavBar";
import Header from "../components/navigation/Header";
import Note from "../components/items/Note";
import { fakeNoteData as fakedata } from "../utils/constants";
import Modal from "../components/overlays/Modal";
import CreateForm from "../components/forms/CreateForm";

const initialNote: NoteModel = {
  uid: "",
  parent: "",
  title: "",
  text: "",
  tags: [],
  updated: "",
};

const tempTags = [
  {
    "_id": "457",
    "uid": "string",
    "name": "testTag",
    "color": "#c5CC6D",
    "created": "2022-08-23T23:13:06.983Z",
    "updated": "2022-08-23T23:13:06.983Z"
  },
  {
    "_id": "",
    "uid": "string",
    "name": "untagged",
    "color": "#c5CC6D",
    "created": "2022-08-23T23:13:06.983Z",
    "updated": "2022-08-23T23:13:06.983Z"
  },
  {
    "_id": "5647",
    "uid": "string",
    "name": "testTag2",
    "color": "#c5CC6D",
    "created": "2022-08-23T23:13:06.983Z",
    "updated": "2022-08-23T23:13:06.983Z"
  },
  {
    "_id": "testTag3",
    "uid": "string",
    "name": "testTag3",
    "color": "#c5CC6D",
    "created": "2022-08-23T23:13:06.983Z",
    "updated": "2022-08-23T23:13:06.983Z"
  }
];

type currentNoteData = {
  note: NoteModel;
  isEditing: boolean;
};

const reducer = (state: Map<any, any>, action: any) => {
  switch (action.type) {
    case "CREATE":
      return new Map(state.set(action.payload.tag, toKeyValueMap(action.payload.response)));
    case "UPDATE": {
      const tags = action.payload.response.tags ?? [{ "name": "untagged" }];
      tags.forEach((tag: Tag) => {
        state.set(tag.name, new Map(state.get(tag.name).set(action.payload.id, action.payload.response)));
      });
      return new Map(state);
    }
    case "DELETE":
      action.payload.response.tags.forEach((tag: Tag) => {
        state.set(tag, state.get(tag).delete(action.payload.id, action.payload.response));
      });
      return new Map(state);
    default:
      return state;
  };
}

const notesPage = () => {
  const [noteData, dispatch] = useReducer(reducer, new Map());
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<currentNoteData>({ note: initialNote, isEditing: false });

  /* Fetch notes from api based on tags */
  const fetchData = async (tagID: string) => {
    try {
      const response = await OnItApi.note.search(tagID !== "" ? { tags: [tagID] } : {});
      if (!response || response.error)
        throw response.error?.message;

      return response.payload;
    } catch (error) {
      toast(`Error loading tag: ${tagID}`);
    }
    return null;
  };

  const mapData = (fetch: Function) => {
    tempTags.forEach(async (tag) => {
      const response = await fetch(tag._id);
      if (response.length > 0)
        dispatch({ type: "CREATE", payload: { tag: tag.name, response } });
      else
        toast(`Nothing found for tag: ${tag.name}`);
    });
  }

  // onMount load all notes
  useEffect(() => {
    mapData(fetchData);
  }, []);

  // onClick select Note and set state to edit.
  const selectNoteToEdit = async (noteID: string) => {
    try {
      const response = await OnItApi.note.get(noteID);

      if (!response || response.error)
        throw response.error?.message;

      setCurrentNote({ note: response.payload!, isEditing: true });

    } catch (error) {
      toast("Error: Couldn't load note" || (error as string));
    }
  };

  // onClose of Modal with EditNote update note to API
  const updateNote = async () => {
    try {
      const response = await OnItApi.note.update(currentNote.note._id!, currentNote.note!);

      if (response.error) throw response.error?.message;

      setCurrentNote({ note: initialNote, isEditing: false });

      dispatch({ type: "UPDATE", payload: { id: currentNote.note._id, response: response.payload } });

    } catch (error) {
      toast("Error: Couldn't update note" || (error as string));
    }
  };

  const renderNotes = (data: Map<any, NoteModel>) => {
    const toRender: Array<React.ReactNode> = [];
    data.forEach((value) =>
      toRender.push(<Note key={value._id} NoteData={value} selectNoteToEdit={selectNoteToEdit} />),
    );
    return toRender;
  };

  const renderNoteCollection = (data: any) => {
    const toRender: Array<React.ReactNode> = [];
    noteData.forEach((value, key) => {
      toRender.push(
        // eslint-disable-next-line react/no-array-index-key
        <Collection key={key} collectionTitle={key} variant="normalCollection">
          {renderNotes(value)}
        </Collection>,
      );
    });
    return toRender;
  };

  // TODO delete note

  return (
    <>
      <NavBar modalState={modalOpen} setModalOpen={setModalOpen}>
        <CreateForm handleSubmit={() => console.log("To be implemented")} />
      </NavBar>
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <Modal open={currentNote.isEditing} onClose={updateNote} editNote>
            <EditNote noteData={currentNote.note} setNoteData={setCurrentNote} />
          </Modal>
          {renderNoteCollection(noteData)}
        </div>
      </div>
    </>
  );
};

export default notesPage;
