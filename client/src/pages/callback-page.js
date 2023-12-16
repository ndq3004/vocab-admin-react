import React from "react";
// import { NavBar } from "../components/navigation/desktop/nav-bar";
// import { NavBar } from "../components/";
// import { MobileNavBar } from "../components/navigation/mobile/mobile-nav-bar";
import { useAuth0 } from "@auth0/auth0-react";
import { Auth0TokenProvider } from "../app/auth";


export default function CallbackPage(){
  const authProvider = new Auth0TokenProvider();
  authProvider.requestToken();
  return (
    <div className="page-layout">
      <div className="page-layout__content" />
    </div>
  );
}