 import 'dotenv/config';

import express from 'express';
import mysqlx from '@mysql/xdevapi';

import config from './config.mjs';

const app = express();

app.set('view engine', 'pug');

const port = process.env.PORT || 7777;

app.get('/about', (req,res) => {
	res.status(200).render('about');
});

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

app.get('/login', (req,res) => {
	res.status(200).render('login');
});

app.get('/registration', (req,res) => {
	res.status(200).render('registration');
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

  const table = session
    .getSchema('prototype_schema')
    .getTable('prototype_table');

  const result = await table.select().execute();

  // Gets the columns for the table.
  const columns = result.getColumns();

  // Creates an array of column names.
  const columnNames = [ columns[0].getColumnName(),
                        columns[1].getColumnName() ];

  // Send an object containing columns and rows from table.
  res.status(200).send({ columns: columnNames, rows: result.fetchAll() });

  session.close();
});

app.get('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const table = session
    .getSchema('prototype_schema')
    .getTable('prototype_table');

  const result = await table.select().where(`id LIKE :id`).bind('id', req.params.user_id).execute();

  // Gets the columns for the table.
  const columns = result.getColumns();

  // Creates an array of column names.
  const columnNames = [ columns[0].getColumnName(),
                        columns[1].getColumnName() ];

  // Send an object containing columns and rows from table.
  res.status(200).send({ columns: columnNames, rows: result.fetchAll() });

  session.close();
});

// DELETE AN INDIVIDUAL SYSTEM RESOURCE
app.delete('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const table = session
    .getSchema('prototype_schema')
    .getTable('prototype_table');

  const result = await table.delete().where(`id LIKE :id`).bind('id', req.params.user_id).execute();

  // Send an object containing columns and rows from table.
  res.status(204).end();

  session.close();
});

// CREATE AN INDIVIDUAL SYSTEM RESOURCE
app.post('/api/users', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const table = session
    .getSchema('prototype_schema')
    .getTable('prototype_table');

  let result;

  try {
    result = await table.insert({ id: 4, value: 'lady' }).execute();

    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }

  session.close();
});

// UPDATE AN INDIVIDUAL SYSTEM RESOURCE
app.put('/api/users/:user_id', async (req, res) => {
  const session = await mysqlx.getSession(config);

  const table = session
    .getSchema('prototype_schema')
    .getTable('prototype_table');

    try {
        const result = await table.update().where(`id LIKE ${req.params.user_id}`).set('value', 'gotChanged').execute();
    
        // Send an object containing columns and rows from table.
        res.status(200).end();
    } catch (e) {
        res.status(500).end();
    }
  session.close();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});



