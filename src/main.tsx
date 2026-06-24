import "./index.css";

import { ApiProvider } from "./api/api-provider";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { Toast } from "./components/toast";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <BrowserRouter>
        <App />
        <Toast />
      </BrowserRouter>
    </ApiProvider>
  </StrictMode>,
);
