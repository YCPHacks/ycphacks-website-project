import 'dotenv/config';

import express from 'express';

//auth: Middleware that will return a 401 if a valid JWT bearer token is not provided in the request.
//requiredScopes: Check a token's scope claim to include a number of given scopes, raises a 401 insufficient_scope
// error if the value of the scope claim does not include all the given scopes.
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const app = express();

const port = process.env.PORT;

// Authorization middleware. Confirm access token exists and verify against auth0 JSON web key set
const checkJwt = auth({
  audience: `${process.env.AUDIENCE}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`
});

//public path everyone can see this
app.get('/api/public', (req, res) => {
  res.json({
    message: `Everyone can see this.`
  });
});

//private path, user must be authenticated
app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: `If you see this, then you've been authenticated.`
  });
});

//private path, needs to be authenticated and have read messages scope
app.get('/api/private-scoped', checkJwt, requiredScopes('read:messages'), (req, res) => {
  res.json({
    message: `If you see this, then you've been authenticated and have the 'read:messages' scope.`
  });
});

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  return res.set(err.headers).status(err.status).json({ message: err.message });
});

//start api server
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
