import React from "react";
import flexLogo from "../../assets/images/flex-logo.png";
import classes from "./Logo.module.css";

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={flexLogo} alt="FlexHealth" />
    </div>
  );
};
export default Logo;
