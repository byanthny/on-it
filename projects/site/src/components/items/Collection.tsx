import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri";
import Button from "./Button";

type CollectionTypes = "noteCollection" | "normalCollection";

interface PropTypes {
  children: React.ReactNode | void;
  collectionTitle: string;
  variant: CollectionTypes;
}

const Collection = ({ children, collectionTitle, variant }: PropTypes) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <h2 className="collectionTitle">
        {collectionTitle}
        <Button variant="transparent" onClick={() => setOpen(!open)}>
          {open ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}
        </Button>
      </h2>
      <div className={`noteCollection ${variant} ${open ? "" : "closed"}`}>
        {children || <p>nothing to show</p>}
      </div>
    </>
  );
};

export default Collection;
