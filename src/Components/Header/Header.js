import style from "./Header.module.css";
import Navigation from "./Navigation";
function Header(props) {
  return (
    <div className={style.header}>
      <h2 className={style.heade}>A Typical Page</h2>
      <Navigation />
    </div>
  );
}
export default Header;
