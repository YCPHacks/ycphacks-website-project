import 'dotenv/config';

import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

import router from './routes/index.mjs';

const app = express();

const port = process.env.PORT;

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
