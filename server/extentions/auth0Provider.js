const axios = require("axios").default;

const getManagementAPIAccessToken = async () => {
    const options = {
        method: 'POST',
        url: `${process.env.AUTH_ISSUER_BASE_URL}/oauth/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.AUTH_CLIENT_ID,
            client_secret: process.env.AUTH_CLIENT_SECRET,
            audience: `${process.env.AUTH_ISSUER_BASE_URL}/api/v2/`
        })
    };
    try {
        const response = await axios.request(options);
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }

    return null;
}

exports.createUser = async (props) => {
    const managementAccessToken = await getManagementAPIAccessToken();

    
}