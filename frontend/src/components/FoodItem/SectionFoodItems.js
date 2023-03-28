import React from "react";
import classes from "../../screens/HomePage.module.css";
import Burger from "../../assets/burger.avif";
import { IoMdEye } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { Fade } from "react-reveal";

const SectionFoodItems = () => {
  return (
    <div className={classes["section-food-items"]}>
      <div className={classes["food-items"]}>
        {Array.from(Array(20).keys()).map((item, i) => (
          <Fade duration='1000' delay='200' key={i}>
            <div className={classes["food-item"]}>
              <div className={classes["food-img-container"]}>
                <img src={Burger} alt='test' className={classes["food-img"]} />
              </div>
              <div className={classes["food-item-info"]}>
                <div className={classes["food-item-name"]}>
                  <h4>Veg Burger</h4>
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
                  <p>Burger, Fast Food</p>
                </div>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default SectionFoodItems;
