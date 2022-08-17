import "./App.css";
import Login from "./Components/Login/Login";
import Header from "./Components/Header/Header";
import Display from "./Components/Output/Display";
import React, { useState, useEffect } from "react";
import authContext from "./store/auth-contex";
function App() {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const value = localStorage.getItem("isLogIN");
    if (value === "1") {
      setLogin(true);
    }
  }, []);

  function loginHandlers(email, pwd) {
    localStorage.setItem("isLogIN", "1");
    setLogin(true);
  }
  function LogoutHandler() {
    localStorage.removeItem("isLogIN");
    setLogin(false);
  }
  return (
    <authContext.Provider
      value={{
        isLoggedIn: isLogin,
        isLogout: LogoutHandler,
      }}
    >
      <Header />
      <div className="Container">
        {!isLogin && <Login loginHandler={loginHandlers} />}
        {isLogin && <Display />}
      </div>
    </authContext.Provider>
  );
}

export default App;
