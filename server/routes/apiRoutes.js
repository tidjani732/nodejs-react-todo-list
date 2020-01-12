import { Router } from 'express';
import { login, register, todo } from '../util/middlewares/validations';

import { getTodos, postTodos, updateTodos, deleteTodos } from '../controllers/todoCtrl';
import { postLogin, postRegister, activateAccount, getUsers } from '../controllers/authCtrl';
const auth = require('../util/middlewares/auth').default.apiAuth

import uploader from '../util/fileUploader';
import { updateUser, getOne } from '../controllers/userCtrl';




const router = Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     description: Login to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', login, postLogin);

/**
 * @swagger
 * /api/register:
 *   post:
 *     description: Register to the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: User's name.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: surname 
 *         description: User's surname.
 *         in: formData
 *         required: true
 *         type: select
 *       - name: 
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: Email to use for login.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Registers and sends email to the user
 */
router.post('/register', register, postRegister);

/**
 * @swagger
 * /api/activate/{token}:
 *   get:
 *    parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token sent by email
 */
router.get('/activate/:token', activateAccount);

router.get('/users/all', auth, getUsers);

router.get('/user/me', auth, getOne);

router.post('/user/update', auth, uploader.single('image'), updateUser)

router.get('/todos', auth, getTodos);

router.post('/todos', auth, todo, postTodos);

router.post('/todos/update', auth, uploader.single('image'),
    updateTodos);

router.post('/todos/delete', auth, deleteTodos);

//[name, surname, email, sex, password , passwordConfirm];

export default router;
