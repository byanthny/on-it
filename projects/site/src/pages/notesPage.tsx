import React, { useEffect, useReducer, useState } from "react";
import { Note as NoteModel } from "common";
import { toast } from "react-toastify";
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

type currentNoteData = {
  note: NoteModel;
  isEditing: boolean;
};

const notesPage = () => {
  // TODO Use Reducer
  const [noteData, setNoteData] = useState<Array<NoteModel>>([]);
  // const [noteData, dispatch] = useReducer(reducer, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState<currentNoteData>({ note: initialNote, isEditing: false });

  /* Fetch notes from api based on tags */
  const fetchData = async () => {
    try {
      const response = await OnItApi.note.search({});

      if (!response || response.error) throw response.error?.message;

      setNoteData(response.payload!);
    } catch (error) {
      toast("Couldn't load notes :(" || (error as string));
    }
  };

  // onMount load all notes
  useEffect(() => {
    fetchData();
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

      // TODO Update Note Data
    } catch (error) {
      toast("Error: Couldn't update note" || (error as string));
    }
  };

  /* Render Notes */
  const renderNotes = (data: Array<NoteModel>) =>
    data && data.length > 0
      ? data.map((note) => (
        <Note key={note._id} NoteData={note} selectNoteToEdit={selectNoteToEdit} />
      ))
      : null;

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
          <Collection collectionTitle="General" variant="noteCollection">
            {renderNotes(fakedata)}
          </Collection>
          <Collection collectionTitle="General" variant="noteCollection">
            {renderNotes(noteData)}
          </Collection>
          <Collection collectionTitle="General" variant="noteCollection">
            {renderNotes(fakedata)}
          </Collection>
          <Collection collectionTitle="General" variant="noteCollection">
            {renderNotes(fakedata)}
          </Collection>
        </div>
      </div>
    </>
  );
};

export default notesPage;
