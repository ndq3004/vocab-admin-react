import axios from "axios"
import { LocalStorageCache } from "@auth0/auth0-react"

const auth0Cacher = new LocalStorageCache();

const cacheProvider = sessionStorage;

let requestWithRefreshTokenInterval = null;

const checkTokenExpiry = () => {
  console.log('checkTokenExpiry, requestWithRefreshTokenInterval = ', requestWithRefreshTokenInterval);
  if (!requestWithRefreshTokenInterval && cacheProvider.access_token) {
    const tokenExp = parseJwt(cacheProvider.access_token).exp;
    requestWithRefreshTokenInterval = setTimeout(() => {
      console.log('retrieving new token');
      (new Auth0TokenProvider()).requestWithRefreshToken()
      clearTimeout(requestWithRefreshTokenInterval);
    }, (tokenExp+20) * 1000 - (new Date()).getTime());
  }
}

const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const checkAuth = () => {
/*  Getting token value stored in cacheProvider, if token is not present we will open login page 
    for all internal dashboard routes  */
    const TOKEN = cacheProvider.getItem("access_token");
    const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"]

    const isPublicPage = PUBLIC_ROUTES.some( r => window.location.href.includes(r))
    if(!TOKEN && !isPublicPage){
        window.location.href = '/login'
        return;
    }else{
        checkTokenExpiry();
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
        axios.defaults.headers.common['Identifier'] = cacheProvider.id_token;

        axios.interceptors.request.use(function (config) {
            // UPDATE: Add this code to show global loading indicator
            if (!config.url.includes(process.env.REACT_APP_AUTH0_DOMAIN)) {
              document.body.classList.add('loading-indicator');
            }
            
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
              // cacheProvider.removeItem('token')
              // window.location.href = '/login'
            }
            return Promise.reject(error);
          });
        return TOKEN
    }
}

export const checkToken = () => {
  return sessionStorage.getItem("access_token");
}

export const setToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export class Auth0TokenProvider {
  constructor(){
    this.audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    this.scope = 'openid profile email offline_access'
    this.responseType = 'code'
    this.clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    this.callbackUrl = process.env.REACT_APP_AUTH0_CALLBACK_URL;
    this.domain = process.env.REACT_APP_AUTH0_DOMAIN;
  }

  getAuthorizeUrl() {
    return `https://dev-jja1yv2m7fu0pjyn.us.auth0.com/authorize?` + 
                `audience=${this.audience}&` +
                `scope=${this.scope}&` +
                `response_type=${this.responseType}&` +
                `client_id=${this.clientId}&` +
                `redirect_uri=${this.callbackUrl}`;
  }

  getAuthenticationCodeFromUrl(){
    const query = window.location.search.substring(1);
    const params = query.split('&');
    const codePath = params.find(x => x.startsWith('code'))
    return codePath ? codePath.split('=')[1] : '';
  }

  getStateTokenFromUrl(){
    const query = window.location.search.substring(1);
    const params = query.split('&');
    const codePath = params.find(x => x.startsWith('state'))
    return codePath ? codePath.split('=')[1] : '';
  }

  requestToken(){
    const data = {
        grant_type: 'authorization_code',
        client_id: 'PmlN7DqTnv2vTI3m4n0tSVluZvqAvt90',
        client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
        code: this.getAuthenticationCodeFromUrl(),
        redirect_uri: 'http://localhost:3000/callback',
        code_verifier: this.getStateTokenFromUrl()
      }
    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    return axios.post('https://dev-jja1yv2m7fu0pjyn.us.auth0.com/oauth/token', data, { headers }).then(res => {
      console.log(res);
      if (res && res.data) {
        const credential = res.data;
        setToken(credential.access_token);
        Object.keys(credential).forEach(k => sessionStorage.setItem(k, credential[k]))

        window.location.href = '/app/welcome';
      }
    })
  }

  requestWithRefreshToken(){
    const data = {
      grant_type: 'refresh_token',
      client_id: 'PmlN7DqTnv2vTI3m4n0tSVluZvqAvt90',
      client_secret: process.env.REACT_APP_AUTH0_CLIENT_SECRET,
      refresh_token: cacheProvider.getItem('refresh_token')
    }

    const headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    return axios.post(`https://${this.domain}/oauth/token`, data, { headers }).then(res => {
      console.log(res);
      if (res && res.data) {
        const credential = res.data;
        setToken(credential.access_token);
        Object.keys(credential).forEach(k => sessionStorage.setItem(k, credential[k]))
        checkAuth();
      }
    }).catch(res => {
      ["access_token",
      "expires_in",
      "id_token",
      "refresh_token",
      "scope",
      "token_type"].forEach(x => { cacheProvider.removeItem(x); })
      window.location.href = '/login'
    })
  }
}

export default checkAuth