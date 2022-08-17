import "./Login.css";
import Card from "../UI/Card";
import React, { useState, useEffect, useReducer } from "react";
import ErrorModal from "../ErrorModule/ErrorModal";

function Login(props) {
  const loginDetails = [
    { email: "@", pwd: "demo12345" },
    { email: "nave@", pwd: "nave2222" },
    { email: "lava@", pwd: "demlava22222o12345" },
  ];
  const [errorHandler, SetErrorHandler] = useState(false);
  const [formValid, setFormValid] = useState(false);

  function statefn(state, action) {
    if (action.title === "EMAIL_USER_INPUT") {
      return { emailValue: action.val, emailIsvalid: action.val.includes("@") };
    }
    if (action.title === "PASSWORD_USER_INPUT") {
      return {
        passwordValue: action.val,
        passwordIsvalid: action.val.trim().length > 6,
      };
    }
    if (action.title === "INPUT_BLUR") {
      return {
        emailValue: state.emailValue,
        emailIsvalid: state.emailValue.includes("@"),
      };
    }
    if (action.title === "PASSWORD_BLUR") {
      return {
        passwordValue: state.passwordValue,
        passwordIsvalid: state.passwordValue.trim().length > 6,
      };
    }
  }

  const [entireState, dispatchState] = useReducer(statefn, {
    emailValue: "",
    emailIsvalid: null,
    passwordValue: "",
    passwordIsvalid: null,
  });

  //by using object destructing we can use below
  //below use effect will run when the isValid state update hapen
  const { emailIsvalid } = entireState;
  const { passwordIsvalid } = entireState;
  useEffect(() => {
    console.log("Checking form validity");
    setFormValid(emailIsvalid && passwordIsvalid);
  }, [emailIsvalid, passwordIsvalid]);

  function emailChangeHandler(event) {
    dispatchState({ title: "EMAIL_USER_INPUT", val: event.target.value });
    // setFormValid(
    //   event.target.value.includes("@") && passwordState.value.trim().length > 6
    // );
  }
  function passwordChangeHandler(event) {
    dispatchState({ title: "PASSWORD_USER_INPUT", val: event.target.value });
    // setFormValid(emailState.isValid && event.target.value.trim().length > 6);
  }
  function emailValidator() {
    dispatchState({ title: "INPUT_BLUR" });
  }
  function passwordValidator() {
    dispatchState({ title: "PASSWORD_BLUR" });
  }
  function submitHandler(event) {
    event.preventDefault();
    const email = loginDetails.find(
      (obj) => obj.email === entireState.emailValue
    );
    if (email) {
      const d = loginDetails.find(
        (ob) => email.pwd === entireState.passwordValue
      );
      if (d) {
        props.loginHandler(entireState.emailValue, entireState.passwordValue);
      } else {
        SetErrorHandler({
          title: "Invalid Password",
          message: "Entered Valid Password",
        });
        return;
      }
      props.loginHandler(entireState.emailValue, entireState.passwordValue);
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
        <div className="email">
          <label>E-mail</label>
          <input
            className={entireState.emailIsvalid === false ? "emailInvalid" : ""}
            onChange={emailChangeHandler}
            onBlur={emailValidator}
          ></input>
        </div>
        <div className="password">
          <label>Password</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordValidator}
            className={
              entireState.passwordIsvalid === false ? "pwdInvalid" : ""
            }
          ></input>
        </div>
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
