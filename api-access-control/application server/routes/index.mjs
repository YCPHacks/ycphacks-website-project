import express from 'express';

import { auth } from 'express-openid-connect';

const router = express.Router();

router.use(
  auth({
    authorizationParams: {
      response_type: 'code',
      audience: 'http://localhost:3000',
      scope: 'openid profile email read:messages offline_access'
    }
  })
);

router.get('/', async (req, res) => {
  let result = await fetch('http://localhost:3010/api/public');

  result = await result.json();

  res.status(200).render('message', { result });
});

router.get('/private', async (req, res) => {
  const { token_type, access_token, isExpired, refresh } = req.oidc.accessToken;

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

export default router;
