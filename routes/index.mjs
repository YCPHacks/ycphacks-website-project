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

router.get('/gallery', (req, res) => {
    res.status(200).render('gallery');
});

router.get('/teams', (req, res) => {
    res.status(200).render('teams');
});

router.get('/teamManager', (req, res) => {
    res.status(200).render('teamManager');
});

router.get('/pollResults', (req, res) => {
    res.status(200).render('pollResults');
});


router.get('/pollView', (req, res) => {
    res.status(200).render('pollView');
});

router.get('/pollView', (req, res) => {
  res.status(200).render('pollView');
});

router.get('/userList', (req, res) => {
    res.status(200).render('userList');
});

router.get('/dashboard', (req, res) => {
    res.status(200).render('dashboard');
});

router.get('/teamManagement', (req, res) => {
    res.status(200).render('teamManagement');
});

router.get('/teamSettings', (req, res) => {
    res.status(200).render('teamSettings');
});

router.get('/registrationSettings', (req, res) => {
    res.status(200).render('registrationSettings');
});


router.get('/participantsList', (req, res) => {

    const user_list = {
        first: ["Ralph"],
        last: ["Greaves"],
        created_at: ["2022-10-28T14:58:13.967Z"],
        status: ["Pending"]

    };

    res.status(200).render('participantsList', {user_list});
});

router.get('/adminRoles', (req, res) => {

    const admin_list = {
        first: ["Ralph"],
        last: ["Greaves"],
        email: ["admin@email.edu"]
    };

    res.status(200).render('adminRoles', {admin_list});
});


// router.get('/', (req, res) => {
//   const user = {
//     created_at: "2022-10-28T14:58:13.967Z",
//     email: "rgreaves@ycp.edu"
//   };
//
//   res.status(200).render('userList', { user });
// });


export default router;
