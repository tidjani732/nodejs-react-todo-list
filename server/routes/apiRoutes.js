const express = require('express');
const valid = require('../util/middlewares/validations')

const todoCtrl = require('../controllers/todoCtrl');
const authCtrl = require('../controllers/authCtrl');
const auth = require('../util/middlewares/auth').apiAuth


const router = express.Router();

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
router.post('/login', valid.login, authCtrl.postLogin);

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
router.post('/register', valid.register, authCtrl.postRegister);

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
router.get('/activate/:token', authCtrl.activateAccount);

router.get('/todos', auth, todoCtrl.getTodos);

router.post('/todos', auth, valid.todo, todoCtrl.postTodos);

router.post('/todos/update', auth, todoCtrl.updateTodos);

router.post('/todos/delete', auth, todoCtrl.deleteTodos);

//[name, surname, email, sex, password , passwordConfirm];

module.exports = router;
