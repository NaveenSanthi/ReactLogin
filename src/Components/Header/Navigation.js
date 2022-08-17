import style from "./Navigation.module.css";
import authContext from "../../store/auth-contex";
import React, { useContext } from "react";
function Navigation(props) {
  const ctx = useContext(authContext);
  return (
    <ul className={style.list}>
      {ctx.isLoggedIn && <li>Users</li>}
      {ctx.isLoggedIn && <li>Admin</li>}
      {ctx.isLoggedIn && (
        <li className={style.btn} onClick={ctx.isLogout}>
          Logout
        </li>
      )}
    </ul>
  );
}
export default Navigation;
