/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  RiSettings3Fill,
  RiHomeFill,
  RiStickyNoteFill,
  RiCheckboxFill,
  RiAddFill,
} from "react-icons/ri";
import { Task, TaskState } from "common";
import styles from "./navbar.module.scss";
import OnItApi from "../../../services/OnItApi";
import Modal from "../../overlays/Modal/Modal";
import CreateForm from "../../forms/CreateForm/CreateForm";


const Navbar = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const tempCreate = (e:any) => {
    e.preventDefault();
    setModalOpen(true);
    // console.log(`${user.id}`);
    const tempTask:Task = {
      uid: "",
      title: "test",
      state: TaskState.TODO
    }
    // console.log(tempTask);
    try {
      const response = OnItApi.task.create(tempTask);
      // console.log(response);
    } catch (error) {
      // console.log(error)
    }
  }

  return(
  <>
  <div className={styles.navbar}>
    <div className={styles.innerbox}>
      <Link aria-label="home" to="/">
        <RiHomeFill />
      </Link>
      <Link aria-label="to do" to="/todo">
        <RiCheckboxFill />
      </Link>
      <button aria-label="add" type="button" className={styles.addbutton} onClick={(e) => tempCreate(e)}>
        <div className={styles.addbuttonwrapper}>
          <div className={styles.addbuttonfixed}>
            <RiAddFill />
          </div>
        </div>
      </button>
      <Link aria-label="notes" to="/notes">
        <RiStickyNoteFill />
      </Link>
      <Link aria-label="settings" to="/settings">
        <RiSettings3Fill />
      </Link>
    </div>
  </div>
  <Modal open={modalOpen} onClose={setModalOpen}><CreateForm/></Modal>
  </>
);
}

export default Navbar;
