import "./ErrorModal.css";
import ReactDom from "react-dom";
import React, { Fragment } from "react";
function ErrorModal(props) {
  function removeError() {
    props.errorRemover();
  }
  const Backdrop = (props) => {
    return <div className="backdrop" onClick={removeError} />;
  };
  const Modal = (props) => {
    return (
      <div className="ErrorModal">
        <header>{props.message}</header>
        <div>
          <p>{props.description}</p>
        </div>
        <footer>
          <button onClick={removeError}>Okay</button>
        </footer>
      </div>
    );
  };
  return (
    <Fragment>
      {ReactDom.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDom.createPortal(
        <Modal message={props.message} description={props.description} />,
        document.getElementById("overlay-root")
      )}
    </Fragment>
  );
}
export default ErrorModal;
