import React, { useContext, useEffect, useState } from "react";
import classes from "../../../screens/HomePage.module.css";
import BrowseCategories from "./BrowseCategories";
import SearchByKeyword from "./SearchByKeyword";
import { ItemsContext } from "../../../store/ItemsProvider";

export const SearchSection = () => {
  const { fetchItems } = useContext(ItemsContext);
  const [dishNameInput, setDishNameInput] = useState("");
  const [category, setCategory] = useState("");

  const dishNameInputHandler = (e) => {
    setDishNameInput(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      fetchItems(dishNameInput, category);
    }, 500);

    return () => {
      clearInterval(identifier);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dishNameInput]);

  return (
    <div className={classes["search-section"]}>
      <div className={classes["search-container"]}>
        <BrowseCategories />
        <div className={classes["divider"]}></div>
        <SearchByKeyword
          onInputChange={dishNameInputHandler}
          dishNameInput={dishNameInput}
        />
      </div>
    </div>
  );
};
