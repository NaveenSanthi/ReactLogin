import "./Login.css";
import Card from "../UI/Card";
import React, { useState, useReducer } from "react";
import ErrorModal from "../ErrorModule/ErrorModal";

function Login(props) {
  const loginDetails = [
    { email: "@", pwd: "demo12345" },
    { email: "nave@", pwd: "nave2222" },
    { email: "lava@", pwd: "demlava22222o12345" },
  ];
  //const [enteredEmail, setEmailValue] = useState("");
  //const [enteredPassword, setPassword] = useState("");
  //const [emailValid, setEmailValidator] = useState();
  //const [passwordValid, setPasswordValid] = useState();
  const [errorHandler, SetErrorHandler] = useState(false);
  const [formValid, setFormValid] = useState(false);

  // first intha time out kula function execute agum epona antha depency change ahum pothu
  // nambha 500s time kudutha nala .. dependecy la 4 changes nandathu iruntha first ku matum 500s
  //wait panum remaining tak tak nu execute agum
  //to stop this we using remover
  // useEffect(() => {
  //   console.log("Check-CLEAN UP");
  // }, []);

  // useEffect(() => {
  //   const iden = setTimeout(() => {
  //     console.log(" svalidating");
  //     setFormValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 5000);
  //   return () => {
  //     console.log("remover");
  //     clearTimeout(iden);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailReducer = (state, action) => {
    if (action.title === "USER_INPUT") {
      return { value: action.val, isValid: action.val.includes("@") };
    }
    if (action.title === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.includes("@") };
    }
    return { value: "", isValid: false };
  };
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  function passwordReducer(state, action) {
    if (action.title === "USER_INPUT") {
      return { value: action.value, isValid: action.value.trim().length > 6 };
    }
    if (action.title === "INPUT_BLUR") {
      return { value: state.value, isValid: state.value.trim().length > 6 };
    }
  }
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  function emailChangeHandler(event) {
    //setEmailValue(event.target.value);
    dispatchEmail({ title: "USER_INPUT", val: event.target.value });
    setFormValid(
      event.target.value.includes("@") && passwordState.value.trim().length > 6
    );
  }
  function passwordChangeHandler(event) {
    dispatchPassword({ title: "USER_INPUT", val: event.target.value });
    setFormValid(emailState.isValid && event.target.value.trim().length > 6);
  }
  function emailValidator() {
    dispatchEmail({ title: "INPUT_BLUR" });
    // setEmailValidator(emailState.value.includes("@"));
  }
  function passwordValidator() {
    //setPasswordValid(enteredPassword.trim().length > 6);
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
        <div className="email">
          <label>E-mail</label>
          <input
            className={emailState.isValid === false ? "emailInvalid" : ""}
            onChange={emailChangeHandler}
            onBlur={emailValidator}
          ></input>
        </div>
        <div className="password">
          <label>Password</label>
          <input
            onChange={passwordChangeHandler}
            onBlur={passwordValidator}
            className={passwordState.isValid === false ? "pwdInvalid" : ""}
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
