import axios from "axios";

export const fetchFoodItems = async (foodItem = "", category = "") => {
  try {
    let url = "/api/v1/foodItems?";
    if (foodItem) url = url + `name=${foodItem}`;
    if (category) url = url + `category=${category}`;
    console.log(foodItem);

    const response = await axios.get(url, { name: foodItem });
    return response?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateViewTime = async (id, seconds) => {
  try {
    await axios.patch(`/api/v1/foodItems/viewTime/${id}`, {
      viewSeconds: seconds,
    });
  } catch (error) {
    console.log(error);
  }
};
