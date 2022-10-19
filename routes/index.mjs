import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/boring', (req, res) => {
  res.status(200).render('boring');
});

export default router;
