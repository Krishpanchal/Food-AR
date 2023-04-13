import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ItemsProvider from "./store/ItemsProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ItemsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ItemsProvider>
  </React.StrictMode>
);
