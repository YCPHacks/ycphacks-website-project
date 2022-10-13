import 'dotenv/config';

import express from 'express';
import mysqlx from '@mysql/xdevapi';

import config from './config.mjs';

const app = express();

app.set('view engine', 'pug');

const port = process.env.PORT || 7777;

app.get('/users/:user_id', async (req, res) => {
  const request = await fetch(`http://localhost:${port}/api/users/${req.params.user_id}`);
  const response = await request.json();

  // Render in a Pug template.
  res.status(200).render('index', response);
});

app.get('/api/users/:user_id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});