import React from "react";

type PropTypes = {
  children: React.ReactNode;
  onClick: (e?: any) => void;
  variant: "dark" | "normal" | "light" | "transparent";
  submitButton?: boolean;
};

const Button = ({ children, onClick, variant, submitButton = false }: PropTypes) => (
  <button className={`${variant} button`} type={submitButton ? "submit" : "button"} onClick={onClick}>
    {children}
  </button>
);

export default Button;
