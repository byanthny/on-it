import React, { useEffect, useState } from "react";
import { Task as TaskModel, TaskState } from "common";
import OnItApi, {createItem} from "../services/OnItApi";
import Collection from "../components/items/Collection/Collection";
import Task from "../components/items/Task/Task";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import { fakeTaskData as fakedata } from "../utils/constants"
import CreateForm from "../components/forms/CreateForm/CreateForm";
import { toKeyValueMap } from "../utils/utils";

const todoPage = () => {
  const [taskList, setTaskList] = useState<Map<any, any>>();
  const [projects, setProjects] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await OnItApi.task.search({});
    setTaskList(new Map([["none", toKeyValueMap(response.payload!)]]));
  }

  useEffect(() => {
      fetchData()
        .catch(console.error);
  }, []);

  const updateTask = async (title: string, state: TaskState, taskID: string) => {
    try {
      const updatedTask = {
        title,
        state 
      }
      const response = await OnItApi.task.update(taskID, updatedTask);

      if (response.error)
        throw response.error;
      
      taskList!.get("none");
      
    } catch (error) {
      console.log(error);
    }
    // communicate to API
  };

  const handleResponse = (response: any) => {
    const task: TaskModel = {
      _id: response._id,
      uid: response.uuid,
      title: response.title,
      state: response.state,
    }
    // setTaskList([...taskList, task]);
    setModalOpen(false)
    console.log(taskList);
  }

  const handleSubmit = async (itemType: string, data: {checked: boolean, description: string, title: string}) => {
    try {    
      const response = await createItem(itemType, data, itemType==="task" ? handleResponse : undefined);
 
      if(response.error)
        throw response.error

    } catch(error) {
      console.log(error);
      setModalOpen(false)
    }
  }

/*   const renderTask = (data:Array<TaskModel>) => data && data.length > 0 ? data.map((task) => (
    <Task TaskData={task} key={task._id} update={updateTask} />
  )) : null; */


  return (
    <>
      <NavBar modalState={modalOpen} closeModal={setModalOpen}><CreateForm handleSubmit={handleSubmit}/></NavBar>
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">
{/*           {renderTask(fakedata) || <p>Nothing to show</p>}
          <Collection collectionTitle="General" variant="normalCollection">
            {renderTask(taskList)}
          </Collection> */}
        </div>
      </div>
    </>
  );
};

export default todoPage;
