import express from 'express';

const app = express();

const port = process.env.PORT || 7777;

app.get('/users/:user_id', async (req, res) => {
  const request = await fetch(`http://localhost:7777/api/users/${req.params.user_id}`);
  const response = await request.json();

  res.status(200).send(response.id);
});

app.get('/api/users/:user_id', (req, res) => {
  res.status(200).send({ id: req.params.user_id });
  // res.status(200).json({ id: req.params.user_id });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})