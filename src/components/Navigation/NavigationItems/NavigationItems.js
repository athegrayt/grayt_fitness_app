import React, { Fragment } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.isAuthenticated ? (
        <Fragment>
          <NavigationItem exact={props.exact} link="/food-journal">
            Food Journal
          </NavigationItem>
          <NavigationItem link="/journal-log">Journal Log</NavigationItem>
          <NavigationItem link="/user-info">User Info</NavigationItem>
        </Fragment>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem link="/">Authenticate</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Logout</NavigationItem>
      )}
    </ul>
  );
};
export default navigationItems;
