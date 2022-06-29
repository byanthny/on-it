import React, { useEffect, useState } from "react";
import { Note as NoteModel } from "common";
import OnItApi from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/navigation/Header/Header";
import Note from "../components/items/Note/Note";
import {fakeNoteData as fakedata} from "../utils/constants"



const notesPage = () => {
  const [noteData, setNoteData] = useState<Array<NoteModel>>([])


  useEffect(() => {
    /* Fetch all notes from api */
    const fetchData = async () => {
      const response = await OnItApi.note.search({});
      setNoteData(response.payload!);
    }

    fetchData()
      .catch(console.error);
  }, []);

  /* Render Notes */
  const renderNotes = (data:Array<NoteModel>) => data.length > 0 ?
    data.forEach((note) => (
      <Note NoteData={note} />
    )) : null;


  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(noteData)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
        </div>
      </div>
    </>
);
  }

export default notesPage;
