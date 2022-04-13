import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "./mobile.css";
import "alertifyjs/build/css/alertify.css";
import "@react-sigma/core/lib/react-sigma.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
