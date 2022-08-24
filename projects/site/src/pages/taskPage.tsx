import React, { useEffect, useReducer, useState } from "react";
import { Note, Tag, Task as TaskModel, TaskState } from "common";
import { toast } from "react-toastify";
import OnItApi, { createItem } from "../services/OnItApi";
import Collection from "../components/items/Collection";
import Task from "../components/items/Task";
import Header from "../components/navigation/Header";
import NavBar from "../components/navigation/NavBar";
import CreateForm from "../components/forms/CreateForm";
import itemReducer from "../utils/reducers";
import useLoadItems from "../utils/hooks";
import { tempTags } from "../utils/constants";

const taskPage = () => {
  const [taskList, setTaskList] = useState<Map<any, any>>();
  const [modalOpen, setModalOpen] = useState(false);
  const [taskData, dispatch] = useReducer(itemReducer, new Map());

  // Get all tasks from api
  const fetchData = async (tagID: string) => {
    try {
      const response = await OnItApi.task.search(tagID !== "" ? { tags: [tagID] } : {});
      if (!response || response.error) throw response.error?.message;

      return response.payload;
    } catch (error) {
      toast(`Error loading tag: ${tagID}`);
    }
    return null;
  };

  // onMount load all tasks
  useEffect(() => {
    useLoadItems(fetchData, tempTags, dispatch);
  }, []);

  // Update Task
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

      dispatch({ type: "UPDATE", payload: { id: taskID, response: response.payload } });
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };

  // TODO Update to useReducer
  // Handle response from create form
  const handleResponse = (response: any) => {
    const task: TaskModel = response as TaskModel;

    if (task.tags && task.tags.length > 0)
      task.tags.forEach((tag) => {
        setTaskList(taskList!.set(tag, taskList!.get(tag).set(task._id, task)));
      });
    else setTaskList(taskList!.set("none", taskList!.get("none").set(task._id, task)));

    setModalOpen(false);
  };

  // onSubmit create new item
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

  const renderTasks = (data: Map<any, TaskModel>) => {
    const toRender: Array<React.ReactNode> = [];
    data.forEach((value) =>
      toRender.push(<Task TaskData={value} key={value._id} update={updateTask} />),
    );
    return toRender;
  };

  const renderTaskCollection = (data: Map<any, any>) => {
    const toRender: Array<React.ReactNode> = [];
    if (data) {
      data.forEach((value, key) => {
        if (key !== "untagged")
          toRender.push(
            <Collection collectionTitle={key} variant="normalCollection">
              {renderTasks(value)}
            </Collection>,
          );
        else toRender.unshift(renderTasks(value));
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
        <Header title="Tasks" />
        <div className="secondary-content">{renderTaskCollection(taskData)}</div>
      </div>
    </>
  );
};

export default taskPage;
