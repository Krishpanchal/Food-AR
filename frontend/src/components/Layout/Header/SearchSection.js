import React from "react";
import classes from "../../../screens/HomePage.module.css";
import BrowseCategories from "./BrowseCategories";
import SearchByKeyword from "./SearchByKeyword";

export const SearchSection = () => {
  return (
    <div className={classes["search-section"]}>
      <div className={classes["search-container"]}>
        <BrowseCategories />
        <div className={classes["divider"]}></div>
        <SearchByKeyword />
      </div>
    </div>
  );
};
