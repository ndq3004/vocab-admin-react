import axios from "axios"

const initializeApp = () => {
    
    // Setting base URL for all API request via axios
    console.log(window.location.host)
    axios.defaults.baseURL = window.location.origin
    


    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        // axios.defaults.baseURL = process.env.REACT_APP_BASE_URL


    } else {
        // Prod build code



        // Removing console.log from prod
        console.log = () => {};


        // init analytics here
    }

}

export default initializeApp