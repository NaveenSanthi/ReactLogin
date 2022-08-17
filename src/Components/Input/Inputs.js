import React, { useRef, useImperativeHandle } from "react";
import "./input.css";
const Inputs = React.forwardRef((props, ref) => {
  const input = useRef();
  const action = () => {
    input.current.focus();
  };
  useImperativeHandle(ref, () => {
    return {
      focus: action,
    };
  });
  return (
    <div className={props.className}>
      <label>{props.label}</label>
      <input
        ref={input}
        className={props.valid.isValid === false ? "Invalid" : ""}
        onChange={props.changeHandler}
        onBlur={props.blurHandler}
      ></input>
    </div>
  );
});

export default Inputs;
