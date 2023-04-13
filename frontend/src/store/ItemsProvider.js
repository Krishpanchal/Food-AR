import React, { useState } from "react";
import { fetchFoodItems } from "../actions/foodItemsActions";

export const ItemsContext = React.createContext({});

const ItemsProvider = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchItems = async (foodItem, category) => {
    setLoading((prev) => !prev);
    const foodItems = await fetchFoodItems(foodItem, category);
    setLoading((prev) => !prev);
    if (foodItems) {
      setItems(foodItems);
    }
  };

  return (
    <ItemsContext.Provider
      value={{
        items: items,
        fetchItems,
        isLoading,
      }}>
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
