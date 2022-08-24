import React from "react";
import ReactDOM from "react-dom";

type PropTypes = {
  open: boolean;
  children: React.ReactNode;
  onClose: Function;
  editNote?: boolean;
};

const Modal = ({ open, children, onClose, editNote = false }: PropTypes) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className={editNote ? "editNoteModal" : "modal"}>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onClose();
          }}
          className="closeButton"
        >
          X
        </button>
        <br />
        {children}
      </div>
    </div>,
    document.getElementById("overlay-root")!,
  );
};

export default Modal;
