import React from "react";
import classes from "../../../screens/HomePage.module.css";
import { CiSearch } from "react-icons/ci";

const SearchByKeyword = () => {
  return (
    <div className={classes["search-keyword"]}>
      <CiSearch size='25px' color='#7b7877' />
      <input
        className={classes["keyword-input"]}
        placeholder='Search for a dish name'
      />
    </div>
  );
};

export default SearchByKeyword;
