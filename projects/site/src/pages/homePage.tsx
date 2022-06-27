import React from "react";
import Header from "../components/navigation/Header/Header";
import NavBar from "../components/navigation/NavBar/NavBar";
import utils from "../utils/utils";

const homePage = () => {
  const date = new Date();
  const dateString = `${utils.convertMonthNum(date.getMonth())} ${date.getDate()}`;

  return (
    <>
      <NavBar />
      <div className="main-content">
        <Header title={dateString} />
      </div>
    </>
  );
};

export default homePage;
