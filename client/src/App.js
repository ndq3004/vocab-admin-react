import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
import initializeApp from "./app/init";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
import Auth0ProviderWithHistory from "./auth0ProviderWithHistory";

// Importing pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Register = lazy(() => import("./pages/Register"));
const Documentation = lazy(() => import("./pages/Documentation"));
const CallbackPage = lazy(() => import("./pages/callback-page"));

// Initializing different libraries 1
initializeApp();

// Check for login and initialize axios
const authInfo = {
  token: null,
  isAuthenticated: false
};
// const token = checkAuth()

function App() {
  useEffect(() => {
    // 👆 daisy UI themes initialization
    themeChange(false);
  }, []);

  const onAuthenticated = (appState) => {
    if (appState) {
      authInfo.isAuthenticated = true; 
    }
  }

  return (
    <Router>
      <Auth0ProviderWithHistory onAuthenticated={onAuthenticated}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/callback" element={<CallbackPage />} />

          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route
            path="*"
            element={
              <Navigate to={authInfo.isAuthenticated ? "/app/welcome" : "/login"} replace />
            }
          />
        </Routes>
      </Auth0ProviderWithHistory>
    </Router>
  );
}

export default App;
