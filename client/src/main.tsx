import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
        <App />
      </NuqsAdapter>
    </Provider>
  </StrictMode>
);
