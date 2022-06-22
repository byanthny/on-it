import React from "react";
import NavBar from "../components/navigation/NavBar/NavBar";

const fakedata = [
  {
    "_id": "string",
    "uid": "string",
    "parent": "string",
    "title": "string",
    "text": "string",
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "TsRqcLgjUIhb",
        "color": "#b5De21"
      }
    ],
    "createdAt": "2022-06-22T00:25:20.710Z",
    "updatedAt": "2022-06-22T00:25:20.710Z"
  },
  {
    "_id": "string",
    "uid": "string",
    "parent": "string",
    "title": "string",
    "text": "string",
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "TsRqcLgjUIhb",
        "color": "#b5De21"
      }
    ],
    "createdAt": "2022-06-22T00:25:20.710Z",
    "updatedAt": "2022-06-22T00:25:20.710Z"
  },
  {
    "_id": "string",
    "uid": "string",
    "parent": "string",
    "title": "string",
    "text": "string",
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "TsRqcLgjUIhb",
        "color": "#b5De21"
      }
    ],
    "createdAt": "2022-06-22T00:25:20.710Z",
    "updatedAt": "2022-06-22T00:25:20.710Z"
  }
];

const notesPage = () => {
  const notesList = fakedata.map(({ title, state, reminders }) => (
    <ToDo title={title} status={state} update={updateTodo} reminder={reminders[0]} />
  ));

  return(
  <>
    <NavBar />
    <div className="main-content">
      <h1>Notes</h1>
      <div className="secondary-content">{notesList}</div>
    </div>
  </>
);
  }

export default notesPage;
