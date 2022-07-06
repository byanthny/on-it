import React, { useEffect, useState } from "react";
import { Note, Task } from "common";
import OnItApi, {createItem} from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import ToDo from "../components/items/Task/Task";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { fakeTaskData as fakedata } from "../utils/constants"
import CreateForm from "../components/forms/CreateForm/CreateForm";

type TaskList = {
  name: string,
  tasks: Task[]
}

const todoPage = () => {
  const [taskList, setTaskList] = useState<Array<Task>>([]);
  const [projects, setProjects] = useState();

  const fetchData = async () => {
    const response = await OnItApi.task.search({});
    setTaskList(response.payload!);
  }

  useEffect(() => {
      fetchData()
        .catch(console.error);
  }, []);

  const updateTodo = (title: string, status: string) => {
    // eslint-disable-next-line no-console
    console.log(`${title} ${status}`);
    // communicate to API
  };

  const handleSubmit = async (itemType: string, data: {checked: boolean, description: string, title: string}) => {
    try {    
      const response = await createItem(itemType, data);

      if(itemType==="task") {
        console.log("handling repsonse to rerender");
      }

      if(response.error)
        throw response.error

    } catch(error) {
      console.log(error);
    }
  }

  const renderToDo = (data:Array<Task>) => data && data.length > 0 ? data.map((task) => (
    <ToDo TaskData={task} key={task._id} update={updateTodo} />
  )) : null;
  return (
    <>
      <NavBar><CreateForm handleSubmit={handleSubmit}/></NavBar>
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">
          {renderToDo(fakedata) || <p>Nothing to show</p>}
          <Collection collectionTitle="General" variant="normalCollection">
            {renderToDo(taskList)}
          </Collection>
        </div>
      </div>
    </>
  );
};

export default todoPage;
