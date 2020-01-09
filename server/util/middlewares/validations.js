import { body, check } from 'express-validator';

import User from '../../models/user';
export const login = [
    body('email', 'Enter a valide email')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password is required!')
        .notEmpty()
];

export const register = [
    body('name', 'Name is required!')
        .notEmpty(),
    body('email', 'Email must be valid!')
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password should be at leats 6 characters')
        .isLength({ min: 6 }),
    body('passwordConfirm', 'Password mismatch!')
        .custom((val, { req }) => {
            return val === req.body.password
        }),
    body('email').custom(async (email, { req }) => {
        return User.findOne({ email }).then(data => {
            if (data) return Promise.reject("Email already taken!");
        })
    })
]

export const todo = [
    body('title', 'A todo must have title!')
        .notEmpty(),
]
