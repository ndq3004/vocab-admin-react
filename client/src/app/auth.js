import axios from "axios"
import { LocalStorageCache } from "@auth0/auth0-react"

const auth0Cacher = new LocalStorageCache();

const cacheProvider = sessionStorage;

let requestWithRefreshTokenInterval = null;

const checkTokenExpiry = () => {
  // debugger

  const cacheKeys = auth0Cacher.allKeys()
  if (Array.isArray(cacheKeys) && (cacheKeys.length > 0)) {
    const exp = auth0Cacher.get(`@@auth0spajs@@::${process.env.REACT_APP_AUTH0_CLIENT_ID}::@@user@@`).decodedToken.claims.exp;
    const current = new Date();
    if (exp < current.getTime()/1000){
      cacheKeys.forEach(e => { auth0Cacher.remove(e); })
      cacheProvider.token = ""
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
  }
}

const checkAuth = () => {
/*  Getting token value stored in cacheProvider, if token is not present we will open login page 
    for all internal dashboard routes  */
    const TOKEN = cacheProvider.getItem("token");
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
              // cacheProvider.removeItem('token')
              // window.location.href = '/login'
            }
            return Promise.reject(error);
          });
        return TOKEN
    }
}

export const checkToken = () => {
  return sessionStorage.getItem("token");
}

export const setToken = (token) => {
  sessionStorage.setItem("token", token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export class Auth0TokenProvider {
  constructor(){
    this.audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    this.scope = 'openid profile email offline_access'
    this.responseType = 'code'
    this.clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    this.callbackUrl = process.env.REACT_APP_AUTH0_CALLBACK_URL;
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

        window.location.href = '/app/welcome'

        setInterval(() => {
          alert('it\'s time');
        }, credential.expires_in * 1000)

        requestWithRefreshTokenInterval = setInterval(() => {
          debugger
          this.requestWithRefreshToken()
        }, (credential.expires_in + 20) * 1000 );
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

    return axios.post('https://dev-jja1yv2m7fu0pjyn.us.auth0.com/oauth/token', data, { headers }).then(res => {
      console.log(res);
      if (res && res.data) {
        const credential = res.data;
        setToken(credential.access_token);
        Object.keys(credential).forEach(k => sessionStorage.setItem(k, credential[k]))
      }
    }).catch(res => {
      debugger
    })
  }
}

export default checkAuth