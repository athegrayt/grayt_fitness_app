import React from "react";
// import DrawerToggleIcon from '../../../../assets/images/flex-logo.png';
import classes from "./DrawerToggle.module.css";

const DrawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.openMenu}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default DrawerToggle;
