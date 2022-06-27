import React from "react";
import NoteCollection from "../components/notes/NoteCollection/NoteCollection";
import NavBar from "../components/navigation/NavBar/NavBar";
import Header from "../components/navigation/Header/Header";

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

const notesPage = () => (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <NoteCollection collectionTitle="General" data={fakedata} />
          <NoteCollection collectionTitle="General" data={fakedata} />
          <NoteCollection collectionTitle="General" data={fakedata} />
          <NoteCollection collectionTitle="General" data={fakedata} />

        </div>
      </div>
    </>
);

export default notesPage;
