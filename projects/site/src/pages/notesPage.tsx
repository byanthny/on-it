import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "common";
import OnItApi from "../services/OnItApi";
import EditNote from "../components/items/Note/EditNote";
import Collection from "../components/items/Collection/Collection";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/navigation/Header/Header";
import Note from "../components/items/Note/Note";
import { fakeNoteData as fakedata } from "../utils/constants";
import Modal from "../components/overlays/Modal/Modal";

const notesPage = () => {
  const [noteData, setNoteData] = useState<Array<NoteModel>>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState("");

  useEffect(() => {
    /* Fetch all notes from api */
    const fetchData = async () => {
      const response = await OnItApi.note.search({});
      setNoteData(response.payload!);
    };

    fetchData().catch(console.error);
  }, []);

  const editNote = (noteID:string, e:any) => {
    e.preventDefault();
    setEditing(true);
    setCurrentNote(noteID);
  }

  const updateNote = () => {
    console.log("Update Note");
  }

  /* Render Notes */
  const renderNotes = (data: Array<NoteModel>) =>
    data && data.length > 0 ? data.map((note) => <Note key={note._id} NoteData={note} editNote={editNote} />) : null;

  return (
    <>
      <NavBar modalState={modalOpen} closeModal={setModalOpen} />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <Modal open={editing} onClose={setEditing} editNote closeCallback={updateNote}>
            <EditNote noteID={currentNote}/>
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
