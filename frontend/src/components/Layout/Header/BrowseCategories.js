import React from "react";
import classes from "../../../screens/HomePage.module.css";
import { MdCategory } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";

const BrowseCategories = () => {
  return (
    <div className={classes["search-categories"]}>
      <div className={classes["search-categories-section-1"]}>
        <MdCategory size='22px' color='#ff7e8b' />
        <p className={classes["search-placeholder"]}>Select Category</p>
      </div>
      <div className={classes["search-categories-section-2"]}>
        <BiCaretDown size='20px' color='#4f4f4f' />
      </div>
    </div>
  );
};

export default BrowseCategories;
