import React from "react";
import "./Button.css";

const Button = (props) => {
  //todo
  return (
    <>
      <button
        className={`rounded button button-${props.size || "default"} ${
          props.className
        } relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 justify-center`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
