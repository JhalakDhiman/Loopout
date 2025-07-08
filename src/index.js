import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContext";
import { SignupContextProvider } from "./context/SignupContext";
import { CourseContextProvider } from "./context/CourseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
       <SignupContextProvider>
         <CourseContextProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </CourseContextProvider>
      </SignupContextProvider>
    </AuthContextProvider>
);
