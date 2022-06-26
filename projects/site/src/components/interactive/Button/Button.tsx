import React from "react";
import styles from "./button.module.scss"

interface PropTypes {
    children: React.ReactNode;
    onClickFunction: (e?:any) => void,
    variant: string
}

const Button = ({children, onClickFunction, variant}:PropTypes) => (
    <button className={`${styles[variant]}`} type="button" onClick={onClickFunction}>
        {children}
    </button>
);

export default Button;