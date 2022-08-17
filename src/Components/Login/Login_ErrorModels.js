import "./Login.css";
import Card from "../UI/Card";
import React, { useState, useEffect, useReducer } from "react";
import ErrorModal from "../ErrorModule/ErrorModal";
import Inputs from "../Input/Inputs";

function Login(props) {
  const loginDetails = [
    { email: "@", pwd: "demo12345" },
    { email: "nave@", pwd: "nave2222" },
    { email: "lava@", pwd: "demlava22222o12345" },
  ];
  const [errorHandler, SetErrorHandler] = useState(false);
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
    const email = loginDetails.find((obj) => obj.email === emailState.value);
    if (email) {
      const d = loginDetails.find((ob) => email.pwd === passwordState.value);
      if (d) {
        props.loginHandler(emailState.value, passwordState.value);
      } else {
        SetErrorHandler({
          title: "Invalid Password",
          message: "Entered Valid Password",
        });
        return;
      }
      props.loginHandler(emailState.value, passwordState.value);
    } else {
      SetErrorHandler({
        title: "Invalid input",
        message: "Entered Email and password are not registered",
      });
      return;
    }
  }
  function errorRemover() {
    SetErrorHandler(null);
  }
  return (
    <Card>
      {errorHandler && (
        <ErrorModal
          message={errorHandler.title}
          description={errorHandler.message}
          errorRemover={errorRemover}
        />
      )}
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
          className="email"
          label="E-mail"
          valid={emailState}
          changeHandler={emailChangeHandler}
          blurHandler={emailValidator}
        ></Inputs>
        <Inputs
          className="password"
          label="Password"
          valid={passwordState}
          changeHandler={passwordChangeHandler}
          blurHandler={passwordValidator}
        ></Inputs>
        <div className="btn">
          <button
            className={!formValid ? "invalid" : " valid"}
            disabled={!formValid}
          >
            Login
          </button>
        </div>
      </form>
    </Card>
  );
}
export default Login;
