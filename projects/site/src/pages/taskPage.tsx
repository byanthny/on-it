import React, { useEffect, useState } from "react";
import { Task } from "common";
import OnItApi from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import ToDo from "../components/items/Task/Task";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { fakeTaskData as fakedata } from "../utils/constants"

const todoPage = () => {
  const [taskList, setTaskList] = useState<Array<Task>>([]);

  useEffect(() => {

      const fetchData = async () => {
        const response = await OnItApi.task.search({});
        setTaskList(response.payload!);
      }

      fetchData()
        .catch(console.error);
  }, []);

  const updateTodo = (title: string, status: string) => {
    // eslint-disable-next-line no-console
    console.log(`${title} ${status}`);
    // communicate to API
  };

  const renderToDo = (data:Array<Task>) => data.length > 0 ? data.map((task) => (
    <ToDo TaskData={task} key={task._id} update={updateTodo} />
  )) : null;
  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">
          {renderToDo(fakedata) || (<p>Nothing to show</p>)}
          <Collection collectionTitle="General" variant="normalCollection">{renderToDo(taskList)}</Collection>
        </div>
      </div>
    </>
  );
};

export default todoPage;
