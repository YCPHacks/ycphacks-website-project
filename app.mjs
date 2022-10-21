import 'dotenv/config';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { default as index } from './routes/index.mjs';

const app = express();

const port = process.env.PORT || 8080;

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
