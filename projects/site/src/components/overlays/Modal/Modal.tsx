import { ClassNames } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom";
import Button from "../../interactive/Button/Button";
import styles from "./modal.module.scss";

type PropTypes = {
    open: boolean,
    children: React.ReactNode,
    onClose: Function
}

const Modal = ({open, children, onClose}:PropTypes) => {
    if(!open)
        return null;
    
    return ReactDOM.createPortal ( 
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button type="button" onClick={(e)=>{e.preventDefault(); onClose(false);}} className={styles.closeButton}>X</button>
                <br/>
                {children}
            </div>
        </div>, 
        document.getElementById("overlay-root")!
    );
};

export default Modal;