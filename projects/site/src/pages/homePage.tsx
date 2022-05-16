import React from "react";
import NavBar from "../components/navigation/NavBar/NavBar";
import utils from "../utils/utils";

const homePage = () => {
  const date = new Date();
  const dateString = `${utils.convertMonthNum(date.getMonth())} ${date.getDate()}`;

  return (
    <>
      <NavBar />
      <div className="main-content">
        <h1>{dateString}</h1>
      </div>
    </>
  );
};

export default homePage;
