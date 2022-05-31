import React from "react";
import ToDo from "../components/ToDo/ToDo";
import NavBar from "../components/navigation/NavBar/NavBar";

const fakedata = [
  {
    "_id": "string",
    "uid": "string",
    "parent": null,
    "title": "test",
    "due": 0,
    "reminders": [
      "2022-05-16T23:09:56.903Z"
    ],
    "state": "todo",
    "pinned": false,
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "mOwV",
        "color": "#bEF"
      }
    ]
  },
  {
    "_id": "string",
    "uid": "string",
    "parent": null,
    "title": "super long to do because idk super long to do because idk",
    "due": 0,
    "reminders": [
      "2022-05-16T23:09:56.903Z"
    ],
    "state": "done",
    "pinned": false,
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "mOwV",
        "color": "#bEF"
      }
    ]
  },
  {
    "_id": "string",
    "uid": "string",
    "parent": null,
    "title": "medium to do because idk",
    "due": 0,
    "reminders": [
      "2022-05-16T23:09:56.903Z"
    ],
    "state": "todo",
    "pinned": false,
    "tags": [
      {
        "_id": "string",
        "uid": "string",
        "name": "mOwV",
        "color": "#bEF"
      }
    ]
  }
]

const updateTodo = (title: string, status: string) => {
  // eslint-disable-next-line no-console
  console.log(`${title} ${status}`);
  // communicate to API
}

const todoPage = () => {
  const todoList = fakedata.map(({title, state, reminders}) => 
    <ToDo title={title} status={state} update={updateTodo} reminder={reminders[0]} />
  );
  return(<>
    <NavBar />
    <div className="main-content">
      <h1>To Do</h1>
      <div className="secondary-content">
        {todoList}
      </div>
    </div>
  </>
      );
  }

export default todoPage;
