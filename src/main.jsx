import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./scss/custom.scss";

// IMPORTA tu StoreProvider
import { StoreProvider } from "./store/useGlobalReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // 🔴 Aquí es donde debe ir el Provider
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);


