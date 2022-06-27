import React from "react";
import Collection from "../components/items/Collection/Collection";
import ToDo from "../components/items/ToDo/ToDo";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";

// TODO Remove fake data and use API
const fakedata = [
  {
    _id: "string",
    uid: "string",
    parent: null,
    title: "test",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: "todo",
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
  {
    _id: "string",
    uid: "string",
    parent: null,
    title: "super long to do because idk super long to do because idk",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: "done",
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
  {
    _id: "string",
    uid: "string",
    parent: null,
    title: "medium to do because idk",
    due: 0,
    reminders: ["2022-05-16T23:09:56.903Z"],
    state: "todo",
    pinned: false,
    tags: [
      {
        _id: "string",
        uid: "string",
        name: "mOwV",
        color: "#bEF",
      },
    ],
  },
];

const updateTodo = (title: string, status: string) => {
  // eslint-disable-next-line no-console
  console.log(`${title} ${status}`);
  // communicate to API
};

const todoPage = () => {

  const renderToDo = (data:Array<any>) => data.map(({ title, state, reminders }) => (
    <ToDo title={title} status={state} update={updateTodo} reminder={reminders[0]} />
  ));
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">
          {renderToDo(fakedata)}
          <Collection collectionTitle="General" variant="normalCollection">{renderToDo(fakedata)}</Collection>
        </div>
      </div>
    </>
  );
};

export default todoPage;
