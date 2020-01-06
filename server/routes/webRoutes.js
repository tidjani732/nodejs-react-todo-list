const express = require('express');
const adminCtrl = require('../controllers/adminCtrl');

const auth = require('../middlewares/auth');
const validations = require('../middlewares/validations');

const router = express.Router();

router.get('/', auth.webAuth, adminCtrl.getDashboard);

router.get('/login', adminCtrl.getLogin);

router.post('/login', validations.login, adminCtrl.postLogin);

router.post('/logout', adminCtrl.postLogout);

module.exports = router;
