import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = process.env.PORT || 8000;

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.status(200).render('index');
});

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
