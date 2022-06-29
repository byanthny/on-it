import React, { useState } from "react";
import { RiArrowDropDownLine, RiArrowDropRightLine } from "react-icons/ri"
import Button from "../../interactive/Button/Button";
import styles from "./collection.module.scss"

type CollectionTypes = "noteCollection" | "normalCollection";

interface PropTypes {
    children: React.ReactNode | void,
    collectionTitle: string,
    variant: CollectionTypes
}

const Collection = ({children, collectionTitle, variant}:PropTypes) => {

    const [open, setOpen] = useState(true);
        
      return (
        <div>
            <h2 className={styles.collectionTitle}>{collectionTitle}<Button variant="transparent" onClickFunction={()=>setOpen(!open)}>{open ? <RiArrowDropDownLine /> : <RiArrowDropRightLine />}</Button></h2>
            <div className={`${styles[variant]} ${open? "" : styles.collectionClosed}`}>
                {children || (<p>nothing to show</p>)}
            </div>
        </div>
      );
}

export default Collection;