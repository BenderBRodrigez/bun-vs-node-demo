import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApiProvider } from "./api/api-provider";
import App from "./app";
import { Toast } from "./components/toast";

// biome-ignore lint/style/noNonNullAssertion: root element always mounted
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
