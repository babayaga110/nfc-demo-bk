import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ModalProvider } from "./useContext/ModalContext";
import Template from "./components/Template.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ModalProvider>
    <App />
    {/* <Template /> */}
  </ModalProvider>
  // </StrictMode>,
);
