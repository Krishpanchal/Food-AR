import React from "react";
import { Fade } from "react-reveal";
import classes from "../../../screens/HomePage.module.css";

import { SearchSection } from "./SearchSection";

const Header = () => {
  return (
    <header>
      <div className={classes["header-container"]}>
        <div className={classes["header-container-inner"]}>
          <Fade bottom duration='500'>
            <h1>Food AR</h1>
          </Fade>
          <Fade bottom duration='1000'>
            <p className={classes["header-description"]}>
              Experience the future of dinning with us
            </p>
          </Fade>
          <Fade bottom duration='1000'>
            <SearchSection />
          </Fade>
        </div>
      </div>
    </header>
  );
};

export default Header;
