import axios from "axios"
import { LocalStorageCache } from "@auth0/auth0-react"

const auth0Cacher = new LocalStorageCache();

const checkTokenExpiry = () => {
  // debugger

  const cacheKeys = auth0Cacher.allKeys()
  if (Array.isArray(cacheKeys) && (cacheKeys.length > 0)) {
    const exp = auth0Cacher.get(`@@auth0spajs@@::${process.env.REACT_APP_AUTH0_CLIENT_ID}::@@user@@`).decodedToken.claims.exp;
    const current = new Date();
    if (exp < current.getTime()/1000){
      cacheKeys.forEach(e => { auth0Cacher.remove(e); })
      localStorage.token = ""
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
  }
}

const checkAuth = () => {
/*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
    const TOKEN = localStorage.getItem("token");
    const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"]

    const isPublicPage = PUBLIC_ROUTES.some( r => window.location.href.includes(r))
    if(!TOKEN && !isPublicPage){
        window.location.href = '/login'
        return;
    }else{
        checkTokenExpiry();
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`

        axios.interceptors.request.use(function (config) {
            // UPDATE: Add this code to show global loading indicator
            document.body.classList.add('loading-indicator');
            checkTokenExpiry();
            return config
          }, function (error) {
            return Promise.reject(error);
          });
          
          axios.interceptors.response.use(function (response) {
            // UPDATE: Add this code to hide global loading indicator
            document.body.classList.remove('loading-indicator');
            return response;
          }, function (error) {
            document.body.classList.remove('loading-indicator');
            if (error.response.status === 401) {
              localStorage.removeItem('token')
              window.location.href = '/login'
            }
            return Promise.reject(error);
          });
        return TOKEN
    }
}

export const checkToken = () => {
  return localStorage.getItem("token");
}

export const setToken = (token) => {
  localStorage.setItem("token", token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export class Auth0TokenProvider {
  constructor(){
    this.audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    this.scope = 'openid profile email'
    this.responseType = 'code'
    this.clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    this.callbackUrl = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  }
  async getRefreshToken() {
    const uri = `https://dev-jja1yv2m7fu0pjyn.us.auth0.com/authorize?` + 
                `audience=${this.audience}&` +
                //   `scope=${this.scope}&` +
                  `response_type=${this.responseType}&` +
                  `client_id=${this.clientId}&` +
                  `redirect_uri=${this.callbackUrl}`;
                  // `state=xyz`;
    const response = await axios.get(uri);
    console.log(response)
    return response;
  }
}

export default checkAuth