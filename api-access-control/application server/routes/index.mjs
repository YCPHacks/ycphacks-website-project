import express from 'express';

//Express JS middleware implementing sign on for Express web apps using OpenID Connect.
import { auth } from 'express-openid-connect';

const router = express.Router();

//receive access token for api
router.use(
  auth({
    authorizationParams: {
      response_type: 'code',
      audience: 'http://localhost:3000',
      scope: 'openid profile email read:messages offline_access'
    }
  })
);

//app accessing the public api endpoint
router.get('/', async (req, res) => {
  let result = await fetch('http://localhost:3010/api/public');

  result = await result.json();

  res.status(200).render('message', { result });
});

//app accessing the private api endpoint
router.get('/private', async (req, res) => {
  const { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;
  //check if access token is expired
  if (isExpired()) {
    ({ access_token } = await refresh());
  }

  let result = await fetch('http://localhost:3010/api/private', {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });

  result = await result.json();

  res.status(200).render('message', { result });
});

//app accessing the private-scoped api endpoint
router.get('/private-scoped', async (req, res) => {
  const { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;

  if (isExpired()) {
    ({ access_token } = await refresh());
  }

  let result = await fetch('http://localhost:3010/api/private-scoped', {
    headers: {
      Authorization: `${token_type} ${access_token}`,
    },
  });

  result = await result.json();

  res.status(200).render('message', { result });
});

//export router for app server
export default router;
