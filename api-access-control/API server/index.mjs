import 'dotenv/config';

import express from 'express';

import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';

const app = express();

const port = process.env.PORT;

const checkJwt = auth({
  audience: `${process.env.AUDIENCE}`,
  issuerBaseURL: `${process.env.ISSUER_BASE_URL}`
});

app.get('/api/public', (req, res) => {
  res.json({
    message: `Everyone can see this.`
  });
});

app.get('/api/private', checkJwt, (req, res) => {
  res.json({
    message: `If you see this, then you've been authenticated.`
  });
});

app.get('/api/private-scoped', checkJwt, requiredScopes('read:messages'), (req, res) => {
  res.json({
    message: `If you see this, then you've been authenticated and have the 'read:messages' scope.`
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  return res.set(err.headers).status(err.status).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
