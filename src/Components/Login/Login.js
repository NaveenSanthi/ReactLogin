import "./Login.css";
import Card from "../UI/Card";
import React, { useState, useEffect, useReducer, useRef } from "react";
import Inputs from "../Input/Inputs";

function Login(props) {
  const email = useRef();
  const pwd = useRef();

  const [formValid, setFormValid] = useState(false);
  const emailReducer = (state, action) => {
    if (action.title === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.title === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
  };

  function passwordReducer(state, action) {
    if (action.title === "USER_INPUT") {
      return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.title === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
  }
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //by using object destructing we can use below
  //below use effect will run when the isValid state update hapen
  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;
  useEffect(() => {
    console.log("Checking form validity");
    setFormValid(emailValid && passwordValid);
  }, [emailValid, passwordValid]);

  function emailChangeHandler(event) {
    dispatchEmail({ title: "USER_INPUT", val: event.target.value });
    // setFormValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  }
  function passwordChangeHandler(event) {
    dispatchPassword({ title: "USER_INPUT", val: event.target.value });
    // setFormValid(emailState.isValid && event.target.value.trim().length > 6);
  }
  function emailValidator() {
    dispatchEmail({ title: "INPUT_BLUR" });
  }
  function passwordValidator() {
    dispatchPassword({ title: "INPUT_BLUR" });
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formValid) {
      props.loginHandler(emailState.value, passwordState.value);
    } else if (!emailValid) {
      email.current.focus();
    } else {
      pwd.current.focus();
    }
  }
  return (
    <Card>
      <form onSubmit={submitHandler}>
        {/* <div className="email">
          <label>E-mail</label>
          <input
            className={emailState.isValid === false ? "emailInvalid" : ""}
            onChange={emailChangeHandler}
            onBlur={emailValidator}
          ></input>
        </div> */}
        <Inputs
          ref={email}
          className="email"
          label="E-mail"
          valid={emailState}
          changeHandler={emailChangeHandler}
          blurHandler={emailValidator}
        ></Inputs>
        <Inputs
          ref={pwd}
          className="password"
          label="Password"
          valid={passwordState}
          changeHandler={passwordChangeHandler}
          blurHandler={passwordValidator}
        ></Inputs>
        <div className="btn">
          <button className="valid">Login</button>
        </div>
      </form>
    </Card>
  );
}
export default Login;
