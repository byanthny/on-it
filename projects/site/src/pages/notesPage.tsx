import React from "react";
import Note from "../components/notes/Note/Note";
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

const notesPage = () => {
  const notesList = fakedata.map(({ title, text, tags, updatedAt }) => (
    <Note title={title} text={text} tags={tags} updatedAt={updatedAt} />
  ));

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="Notes" />
        <div className="secondary-content">
          <div>{notesList}</div>
        </div>
      </div>
    </>
  );
};

export default notesPage;
