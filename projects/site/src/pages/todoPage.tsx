import React, { useEffect, useState } from "react";
import { Task } from "common";
import OnItApi from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import ToDo from "../components/items/ToDo/ToDo";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";

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

interface ExtendedTaskModel extends Omit<Task, "due" | "state"> {
  _id: string,
  due: number,
  state: string
}

const todoPage = () => {
  const [todoData, setToDoData] = useState<Array<any>>([]);

  useEffect(() => {

      const fetchData = async () => {
        const response = await OnItApi.task.search({});
        setToDoData(response.payload!);
      }

      fetchData()
        .catch(console.error);
  }, []);

  const updateTodo = (title: string, status: string) => {
    // eslint-disable-next-line no-console
    console.log(`${title} ${status}`);
    // communicate to API
  };

  const renderToDo = (data:Array<ExtendedTaskModel>) => data.length > 0 ? data.map(({ title, state, due, _id }) => (
    <ToDo title={title} status={state} update={updateTodo} due={due} key={_id!} />
  )) : null;
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">
          {renderToDo(fakedata)}
          <Collection collectionTitle="General" variant="normalCollection">{renderToDo(todoData)}</Collection>
        </div>
      </div>
    </>
  );
};

export default todoPage;
