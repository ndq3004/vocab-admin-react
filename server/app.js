const express = require("express");
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");


// configure app
require("./configuration/setupConfig").configApp(app);

const checkJwt = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_TOKEN_SIGNING_ALG,
});

//router
const vocabRouter = require("./routes/vocab");
const defaultRouter = require("./routes/default");

app.use('/api', checkJwt, vocabRouter)

app.use('*', defaultRouter)

// run listener
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

