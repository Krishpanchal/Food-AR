import React, { useEffect, useRef, useState } from "react";
import { IoMdEye } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { Fade } from "react-reveal";
import classes from "../../screens/HomePage.module.css";

const FoodItem = ({ item }) => {
  const modelRef = useRef(null);

  useEffect(() => {
    const myModel = modelRef.current;

    let startTime = 0;
    let endTime = 0;

    myModel.addEventListener("ar-status", (e) => {
      if (e.detail.status === "session-started") {
        startTime = new Date().getTime() / 1000;
        console.log("startTime", startTime);
      }

      if (e.detail.status === "not-presenting") {
        endTime = new Date().getTime() / 1000;
        console.log("startTime", startTime);
        console.log("endTime", endTime);

        const duration = endTime - startTime;
        console.log(`The model was seen for ${duration} seconds.`);
      }
    });
    // Clean up event listener on unmount
    return () => {
      myModel.removeEventListener("ar-status", null);
    };
  }, []);

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
            ref={modelRef}></model-viewer>
        </div>
        <div className={classes["food-item-info"]}>
          <div className={classes["food-item-name"]}>
            <h4>{item.name}</h4>
            <div className={classes["food-item-checks"]}>
              <div className={classes["food-views"]}>
                <IoMdEye color='#959392' size='1.6rem' />
                <p>43</p>
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
