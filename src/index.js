import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ToastContainer autoClose={1000} position="top-center" />
    <App />
  </BrowserRouter>
);
