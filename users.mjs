import 'dotenv/config';

import { ManagementClient } from 'auth0';

const management = new ManagementClient({
  domain: process.env.DOMAIN,
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
//  scope: 'read:users',
});

export const getUsers = async () => {
  try {
    const users = await management.getUsers();

    return users;
  } catch {

  };
};
