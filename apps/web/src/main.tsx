import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-auth-kit";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider authName="auth" authType="localstorage">
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster position="top-center" />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);
