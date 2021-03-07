import React, { Fragment } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

const Modal = (props) => {
  let propsChildren = props.children;
  if (props.children === "Request failed with status code 401") {
    propsChildren = "Please logout and reauthenticate.";
  }
  return (
    <Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {propsChildren}
      </div>
    </Fragment>
  );
};
export default Modal;
