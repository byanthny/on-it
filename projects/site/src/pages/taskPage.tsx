import React, { useEffect, useState } from "react";
import { Note, Tag, Task as TaskModel, TaskState } from "common";
import OnItApi, { createItem } from "../services/OnItApi";
import Collection from "../components/items/Collection";
import Task from "../components/items/Task";
import Header from "../components/navigation/Header";
import NavBar from "../components/navigation/NavBar";
import CreateForm from "../components/forms/CreateForm";
import { toKeyValueMap } from "../utils/utils";

const taskPage = () => {
  const [taskList, setTaskList] = useState<Map<any, any>>();
  const [projects, setProjects] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await OnItApi.task.search({});
    setTaskList(new Map([["none", toKeyValueMap(response.payload!)]]));
  };

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const updateTask = async (
    title: string,
    state: TaskState,
    taskID: string,
    errorCallback: Function,
    tags?: Array<Tag>,
  ) => {
    try {
      const updatedTask = {
        title,
        state,
      };
      const response = await OnItApi.task.update(taskID, updatedTask);

      if (response.error) throw response.error;

      if (tags && tags.length > 0)
        tags.forEach((tag) => {
          setTaskList(taskList!.set(tag, taskList!.get(tag).set(taskID, response.payload)));
        });
      else taskList!.set("none", taskList!.get("none").set(taskID, response.payload));
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };

  const handleResponse = (response: any) => {
    const task: TaskModel = response as TaskModel;

    if (task.tags && task.tags.length > 0)
      task.tags.forEach((tag) => {
        setTaskList(taskList!.set(tag, taskList!.get(tag).set(task._id, task)));
      });
    else setTaskList(taskList!.set("none", taskList!.get("none").set(task._id, task)));

    setModalOpen(false);
  };

  const handleSubmit = async (itemType: string, data: TaskModel | Note) => {
    try {
      const response = await createItem(
        itemType,
        data,
        itemType === "task" ? handleResponse : undefined,
      );

      if (response.error) throw response.error;
    } catch (error) {
      console.log(error);
      setModalOpen(false);
    }
  };

  const renderTaskList = (data: Map<any, TaskModel>) => {
    const toRender: Array<React.ReactNode> = [];
    data.forEach((value) =>
      toRender.push(<Task TaskData={value} key={value._id} update={updateTask} />),
    );
    return toRender;
  };

  const renderTask = (data: any) => {
    const toRender: Array<React.ReactNode> = [];
    if (taskList) {
      taskList.forEach((value, key) => {
        if (key !== "none")
          toRender.push(
            <Collection collectionTitle={key} variant="normalCollection">
              {renderTaskList(value)}
            </Collection>,
          );
        else toRender.push(renderTaskList(value));
      });
    }
    return toRender;
  };

  return (
    <>
      <NavBar modalState={modalOpen} setModalOpen={setModalOpen}>
        <CreateForm handleSubmit={handleSubmit} />
      </NavBar>
      <div className="main-content">
        <Header title="To Do" />
        <div className="secondary-content">{renderTask(taskList)}</div>
      </div>
    </>
  );
};

export default taskPage;
