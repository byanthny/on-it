/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  RiSettings3Fill,
  RiHomeFill,
  RiStickyNoteFill,
  RiCheckboxFill,
  RiAddFill,
} from "react-icons/ri";
import Modal from "../../overlays/Modal/Modal";

type PropTypes = {
  children?: React.ReactNode;
  modalState: boolean;
  closeModal: Function;
};

const Navbar = ({ children, modalState, closeModal }: PropTypes) => {
  const openCreateModal = (e: any) => {
    e.preventDefault();
    closeModal(true);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-inner">
          <Link aria-label="home" to="/">
            <RiHomeFill />
          </Link>
          <Link aria-label="to do" to="/todo">
            <RiCheckboxFill />
          </Link>
          <button
            aria-label="add"
            type="button"
            className="navbar-add"
            onClick={(e) => openCreateModal(e)}
          >
            <div className="addbuttonwrapper">
              <div className="addbuttonfixed">
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
      <Modal open={modalState} onClose={closeModal}>
        {children}
      </Modal>
    </>
  );
};

export default Navbar;
