import React from "react";
import {Note as NoteModel} from "common";
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
  updatedAt: string
}

const notesPage = () => {

  const renderNotes = (data:Array<ExtendedNoteModel>) =>
    data.map(({ title, text, tags, updatedAt }) => (
      <Note title={title} text={text} tags={tags} updatedAt={updatedAt} />
    ));


  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>
          <Collection collectionTitle="General" variant="noteCollection">{renderNotes(fakedata)}</Collection>

        </div>
      </div>
    </>
);
  }

export default notesPage;
