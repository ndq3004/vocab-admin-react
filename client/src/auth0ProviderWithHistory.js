import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import checkAuth from './app/auth';
import { setToken, checkToken } from './app/auth';

const BoundProvider = ({children}) => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  if (isAuthenticated && !checkToken()){
    document.body.classList.add('loading-indicator');
    getAccessTokenSilently().then(res => {
      document.body.classList.remove('loading-indicator');
      setToken(res)
    })
  } else if (!(window.location.pathname === '/callback')) {
    checkAuth();
  }

  return (
    <>
      {children}
    </>
  )
}

const Auth0ProviderWithHistory = ({ children, onAuthenticated }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = `${window.location.origin}/callback`;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  const { isAuthenticated } = useAuth0()

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    onAuthenticated(appState)
    navigate(appState?.returnTo || window.location.pathname);
  };

  console.log(isAuthenticated)
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      onRedirectCallback={onRedirectCallback}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: audience
      }}
      cacheLocation='localstorage'
      useRefreshTokens={true}
    >
      <BoundProvider>
        {children}
      </BoundProvider>
    </Auth0Provider>
  );
};



export default Auth0ProviderWithHistory;