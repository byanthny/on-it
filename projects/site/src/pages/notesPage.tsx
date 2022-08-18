import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "common";
import { toast } from "react-toastify";
import OnItApi from "../services/OnItApi";
import EditNote from "../components/items/Note/EditNote";
import Collection from "../components/items/Collection/Collection";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/navigation/Header/Header";
import Note from "../components/items/Note/Note";
import { fakeNoteData as fakedata } from "../utils/constants";
import Modal from "../components/overlays/Modal/Modal";

const initalNote: NoteModel =
  {
    uid: "",
    parent: "",
    title: "",
    text: "",
    tags: [],
    updated: "",
  };

const notesPage = () => {
  // TODO Use Reducer
  const [noteData, setNoteData] = useState<Array<NoteModel>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState<NoteModel>(initalNote);

  // onMount load all notes
  useEffect(() => {
    /* Fetch all notes from api */
    const fetchData = async () => {
      const response = await OnItApi.note.search({});
      setNoteData(response.payload!);
    };

    fetchData().catch(console.error);
  }, []);

  // onClick select Note and set state to edit.
  const selectNoteToEdit = async (noteID:string) => {
    try {
      const response = await OnItApi.note.get(noteID);

      if(response.error)
          throw response.error.message

      setCurrentNote(response.payload!);

    } catch (error) {
        toast(error as string);
    }

    setEditing(true);
  }

  // onClose of Modal with EditNote update note to API
  const updateNote = async () => {
    try {
      console.log(currentNote)
      const response = await OnItApi.note.update(currentNote._id!, currentNote);

      if(response.error)
          throw response.error.message

    } catch (error) {
        toast(error as string);
    }

    // TODO Update noteData

    setCurrentNote(initalNote);
    setEditing(false);
  }

  /* Render Notes */
  const renderNotes = (data: Array<NoteModel>) =>
    data && data.length > 0 ? data.map((note) => <Note key={note._id} NoteData={note} selectNoteToEdit={selectNoteToEdit} />) : null;

  return (
    <>
      <NavBar modalState={modalOpen} closeModal={setModalOpen} />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <Modal open={editing} onClose={setEditing} editNote closeCallback={updateNote}>
            <EditNote noteData={currentNote} setNoteData={setCurrentNote}/>
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
