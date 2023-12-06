const express = require("express");
const app = express();
const { auth, requiredScopes, claimIncludes  } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "vocab-challenge.test",
  issuerBaseURL: `https://dev-jja1yv2m7fu0pjyn.us.auth0.com/`,
  tokenSigningAlg: 'RS256',
});


// configure app
require("./configuration/setupConfig").configApp(app);

//router
const vocabRouter = require("./routes/vocab");
const defaultRouter = require("./routes/default");

app.use('/api', checkJwt, (req, res, next) => {
  console.log(req.auth.payload.permissions)
  if (req.auth.payload.permissions && req.auth.payload.permissions.includes('read:vocab')) {
    next()
  }else{
    res.sendStatus(401)
  }
}, vocabRouter)

app.use('*', defaultRouter)

// run listener
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

