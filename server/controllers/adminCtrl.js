import { compareSync } from 'bcryptjs';
import { validationResult } from 'express-validator';

import User from '..//models/user';
import Todo from '../models/todo';

export function getLogin(req, res, next) {
    res.render('login', {
        title: "Login Page",
        error: req.flash('error')
    });
}

export async function postLogin(req, res, next) {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        req.flash('error', errors.array()[0].msg);
        return res.status(301).redirect('/login');
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        var msg = "Invalid credentials!";
        if (user) {
            if (user.role === 's_admin') {
                const doMatch = compareSync(req.body.password, user.password);
                if (doMatch) {
                    req.session.logged = true;
                    req.session.user = user
                    req.session.save(() => {
                        res.redirect('/');
                    });
                    return
                } else msg = "Invalid credentials!";
            } else msg = "Not authorized to login here!";
        }
        return res.status(400).render('login', {
            title: "Login Page",
            error: msg
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
}

export function postLogout(req, res, next) {
    req.session.destroy(() => {
        res.redirect('/');
    });
}

export async function getDashboard(req, res, next) {
    const todos = await Todo.find({}).populate('user')
    res.render('home', {
        title: "Dashboard",
        todos
    });
}
