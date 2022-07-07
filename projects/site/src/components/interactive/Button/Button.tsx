import React from "react";

interface PropTypes {
  children: React.ReactNode;
  onClickFunction: (e?: any) => void;
  variant: string;
}

const Button = ({ children, onClickFunction, variant }: PropTypes) => (
  <button className={`${variant}`} type="button" onClick={onClickFunction}>
    {children}
  </button>
);

export default Button;
