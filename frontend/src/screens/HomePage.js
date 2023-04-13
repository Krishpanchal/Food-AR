import React, { useContext, useEffect } from "react";
import SectionFoodItems from "../components/FoodItem/SectionFoodItems";
import Header from "../components/Layout/Header/Header";
import { ItemsContext } from "../store/ItemsProvider";

const HomePage = () => {
  const { isLoading, items } = useContext(ItemsContext);

  return (
    <>
      <Header />
      <SectionFoodItems isLoading={isLoading} items={items} />
    </>
  );
};

export default HomePage;
