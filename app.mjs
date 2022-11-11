import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import mysqlx from '@mysql/xdevapi';

import { default as index } from './routes/index.mjs';
import config from './config/config.mjs';

const app = express();
console.log(process.env.MYSQLX_USER);

const port = process.env.PORT || 7777;

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/judgingCriteria', (req,res) => {
	res.status(200).render('judgingCriteria');
});

app.get('/welcomePage', (req,res) => {
	res.status(200).render('welcomePage');
});

app.get('/hardware', (req,res) => {
	res.status(200).render('hardware');
});

app.get('/sponsor', (req,res) => {
	res.status(200).render('sponsor');
});

app.get('/pastEvents', (req,res) => {
	res.status(200).render('pastEvents');
});



app.get('/users', async (req, res) => {
  const request = await fetch(`http://localhost:${port}/api/users`);
  const response = await request.json();

  res.status(200).render('index', response);
});

app.get('/users/:user_id', async (req, res) => {
  const request = await fetch(`http://localhost:${port}/api/users/${req.params.user_id}`);
  const response = await request.json();

  // Render in a Pug template.
  res.status(200).render('index', response);
});

 app.get('/api/users', async (req, res) => {
   const session = await mysqlx.getSession(config);

   const result = await session.sql('CALL GetAllUsers').execute();

   // Gets the columns for the table.
   const columns = result.getColumns();

   // Creates an array of column names.
   const columnNames = [columns[0].getColumnName()];

   // Send an object containing columns and rows from table.
   res.status(200).send({ columns: columnNames, rows: result.fetchAll() });
   

   session.close();
   
   
 });

app.get('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const result = await session.sql('CALL GetOneUser(?)').bind(req.params.user_id).execute();

  // Gets the columns for the table.
  const columns = result.getColumns();

  // Creates an array of column names.
  const columnNames = [columns[0].getColumnName(),
                        columns[1].getColumnName()];

  // Send an object containing columns and rows from table.
  res.status(200).send({ columns: columnNames, rows: result.fetchAll() });

  session.close();
});

// DELETE AN INDIVIDUAL SYSTEM RESOURCE
app.delete('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const result = await session.sql('CALL DeleteUser(?)').bind(req.params.user_id).execute();

  // Send an object containing columns and rows from table.
  res.status(204).end();

  session.close();
});

// CREATE AN INDIVIDUAL SYSTEM RESOURCE
app.post('/api/users', async (req, res) => {
  const session = await mysqlx.getSession(config);

  let result;

  try {
    result = await session.sql('CALL CreateUser(?)').bind("joeMama").execute();

    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }

  session.close();
});

// UPDATE AN INDIVIDUAL SYSTEM RESOURCE
app.put('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

    try {
        const result = await session.sql('CALL UpdateUser(?, ?)').bind(req.params.user_id, "Changed").execute();

      // Send an object containing columns and rows from table.
        res.status(200).end();
    } catch (e) {
        res.status(500).end();
    }
  session.close();
});

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
