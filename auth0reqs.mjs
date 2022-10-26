import 'dotenv/config';

import express from 'express';

const app = express();

const port = process.env.PORT;





const get_access_token = async () => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET,
      audience: `${process.env.ISSUER_BASE_URL}/api/v2/`
    })
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/oauth/token`, options);
  const result = await request.json();

  return result;
};



// Get All Users

const use_access_token = async (jwt) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    }
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users`, options);
  const result = await request.json();

  return result;
};

app.get('/', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await use_access_token(jwt);

  res.status(200).send(users);

  console.log(users);
});




// Get Single User

const use_user_token = async (jwt) => {
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    }
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users-by-email?email=john.doe%40gmail.com`, options);
  const result = await request.json();

  return result;
};

app.get('/email', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await use_user_token(jwt);

  res.status(200).send(users);

  console.log(users);
});






// Delete User

const delete_user = async (jwt) => {
  const options = {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    }
  };

	// // Update the auth0 id to match a non-ycp email address currently in the database
  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users/auth0%7C63569dc079e4a6140a7161c7`, options); 

};

app.delete('/erase', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await delete_user(jwt);

  res.status(200).send(users);

});



// Create User

const create_user = async (jwt) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    },
    body: JSON.stringify({
      connection: 'Username-Password-Authentication',
      email: 'DemonstrationAccount@outlook.com',
      password: 'mummy439!heliotype24'
    })
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users`, options);
  const result = await request.json();

  return result;
};

app.post('/', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await create_user(jwt);

  res.send(users);

  console.log(users);
});




// Update User

const update_user = async (jwt) => {
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    },
    body: JSON.stringify({
	// Change these to update a user 
      given_name: 'Tyler',
      family_name: 'Franks',
      nickname: 'CurrentFarmerOfAmerica'
    })
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users/auth0%7C6355b308e584359a2df82b6e`, options);
  const result = await request.json();

  return result;
};

app.patch('/', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await update_user(jwt);

  res.send(users);

  console.log(users);
});








// Create User w/ Metadata

const create_user_meta = async (jwt) => {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    },
    body: JSON.stringify({
      connection: 'Username-Password-Authentication',
      email: 'mamaOfJoe@joemama.com',
      password: 'Dummy1024!notan21@m3',
	  user_metadata: {
		addresses: {
			home: "123 Sesame Street",
			work: "456 York College"
			}
		},
	  app_metadata: {
		plan: "full"
		}
    })
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users`, options);
  const result = await request.json();

  return result;
};

app.post('/meta', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await create_user_meta(jwt);

  res.send(users);

  console.log(users);
});




// Update User w/ metadata

const update_user_metadata = async (jwt) => {
  const options = {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json', authorization: `${jwt.token_type} ${jwt.access_token}`
    },
    body: JSON.stringify({
	// Change these to update a user 

	  user_metadata: {}
	  // Currently deletes user metadata
    })
  };

  const request = await fetch(`${process.env.ISSUER_BASE_URL}/api/v2/users/auth0%7C635456f8a12752ff48fd3ea7`, options);
  const result = await request.json();

  return result;
};

app.patch('/update', async (req, res, next) => {
  const jwt = await get_access_token();
  const users = await update_user_metadata(jwt);

  res.send(users);

  console.log(users);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});