import React from "react";

type PropTypes = {
  children: React.ReactNode,
  onClick: (e?: any) => void,
  variant: "dark" | "normal" | "light" | "transparent",
}

const Button = ({ children, onClick, variant }: PropTypes) => (
  <button className={`${variant} button`} type="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;
