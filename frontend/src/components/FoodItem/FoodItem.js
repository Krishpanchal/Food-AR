import React, { useRef } from "react";
import { IoMdEye } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { Fade } from "react-reveal";
import classes from "../../screens/HomePage.module.css";
import "@google/model-viewer";
import { updateViewTime } from "../../actions/foodItemsActions";

const FoodItem = ({ item }) => {
  const modelRef = useRef(null);
  let startTime = 0;
  let endTime = 0;

  const handleEventListener = async (e) => {
    if (e.detail.status === "session-started") {
      startTime = new Date().getTime() / 1000;
    }

    if (e.detail.status === "not-presenting") {
      endTime = new Date().getTime() / 1000;

      if (startTime !== 0 && endTime !== 0) {
        const duration = endTime - startTime;
        console.log("Model Id :- ", item.id);

        await updateViewTime(item.id, Math.round(duration));

        console.log(`The model was seen for ${duration} seconds.`);
        console.log("-----------------------------------");
      }

      startTime = 0;
      endTime = 0;
    }
  };

  const handleClick = () => {
    const myModel = modelRef.current;
    myModel.removeEventListener("ar-status", handleEventListener);
    myModel.addEventListener("ar-status", handleEventListener);
  };

  return (
    <Fade>
      <div className={classes["food-item"]}>
        <div className={classes["food-img-container"]}>
          <model-viewer
            src={item?.ar_model?.url}
            poster={item?.ar_model?.url}
            alt='A 3D model of an astronaut'
            shadow-intensity='1'
            camera-controls
            auto-rotate
            ar
            ref={modelRef}>
            <button slot='ar-button' onClick={handleClick}>
              View in your space
            </button>
          </model-viewer>
        </div>
        <div className={classes["food-item-info"]}>
          <div className={classes["food-item-name"]}>
            <h4>{item.name}</h4>
            <div className={classes["food-item-checks"]}>
              <div className={classes["food-views"]}>
                <IoMdEye color='#959392' size='1.6rem' />
                <p>{item?.viewTime ? item.viewTime.length : 0}</p>
              </div>
              <div className={classes["food-rating"]}>
                <AiFillStar color='#fff' size='1.4rem' />
                <p>4.3</p>
              </div>
            </div>
          </div>
          <div className={classes["food-category"]}>
            <p>{item.category.name}</p>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default FoodItem;
