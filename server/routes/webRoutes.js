import { Router } from 'express';
import { getDashboard, getLogin, postLogin, postLogout } from '../controllers/adminCtrl';

import auth from '../util/middlewares/auth';
import { login } from '../util/middlewares/validations';

const router = Router();

router.get('/', auth.webAuth, getDashboard);

router.get('/login', getLogin);

router.post('/login', login, postLogin);

router.post('/logout', postLogout);

export default router;
