import Card from "../UI/Card";
import classes from "./Display.module.css";
function Display() {
  return (
    <Card>
      <p className={classes.p}>Welcome Back</p>
    </Card>
  );
}
export default Display;
