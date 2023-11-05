import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authProvider.jsx";
import NewUploadProvider from "./context/newUploadProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NewUploadProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NewUploadProvider>
    </AuthProvider>
  </React.StrictMode>
);
