import React, { useEffect, useState } from "react";
import {Note as NoteModel} from "common";
import OnItApi from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/navigation/Header/Header";
import Note from "../components/items/Note/Note";

const fakedata = [
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "stringstringstringstringstring",
    text: "string",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updatedAt: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updatedAt: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "string",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updatedAt: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updatedAt: "2022-06-22T00:25:20.710Z",
  },
  {
    _id: "string",
    uid: "string",
    parent: "string",
    title: "string",
    text: "stringstringstringstringstringstringstringstringstringstringstringstring",
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "TsRqcLgjUIhb",
        color: "#b5De21",
      },
    ],
    createdAt: "2022-06-22T00:25:20.710Z",
    updatedAt: "2022-06-22T00:25:20.710Z",
  },
];

interface ExtendedNoteModel extends NoteModel {
  tags: Array<any>,
  updatedAt: string,
  _id: string
}

const notesPage = () => {

  const [noteData, setNoteData] = useState<Array<any>>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await OnItApi.note.search({});
      setNoteData(response.payload!);
    }

    fetchData()
      .catch(console.error);
  }, []);

  const renderNotes = (data:Array<ExtendedNoteModel>) => data.length > 0 ?
    data.map(({ title, text, tags, updatedAt, _id }) => (
      <Note title={title} text={text} tags={tags} updatedAt={updatedAt} key={_id!} />
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
