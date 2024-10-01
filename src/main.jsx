import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Store from "./Redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  
    <Provider store={Store}>
      <App />
    </Provider>
  
);
