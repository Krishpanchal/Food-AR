import React from "react";
import classes from "../../screens/HomePage.module.css";
import FoodItem from "./FoodItem";

const SectionFoodItems = ({ isLoading, items }) => {
  return (
    <div className={classes["section-food-items"]}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className={classes["food-items"]}>
          {items.map((item, i) => (
            <FoodItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionFoodItems;
