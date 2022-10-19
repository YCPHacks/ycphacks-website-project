import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).render('index');
});

router.get('/boring', (req, res) => {
  res.status(200).render('boring');
});

router.get('/judgingCriteria', (req, res) => {
  res.status(200).render('judgingCriteria');
});

router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.get('/pastEvents', (req, res) => {
  res.status(200).render('pastEvents');
});

router.get('/polls', (req, res) => {
  res.status(200).render('polls');
});

router.get('/registration', (req, res) => {
  res.status(200).render('registration');
});

router.get('/sponsor', (req, res) => {
  res.status(200).render('sponsor');
});

router.get('/welcomePage', (req, res) => {
  res.status(200).render('welcomePage');
});

router.get('/login', (req, res) => {
  res.status(200).render('login');
});

router.get('/userList', (req, res) => {
  res.status(200).render('userList');
});

router.get('/hardware', (req, res) => {
  res.status(200).render('hardware');
});

export default router;
