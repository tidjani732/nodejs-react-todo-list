const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('..//models/user');
const Todos = require('../models/todo');

exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: "Login Page",
        error: req.flash('error')
    });
}

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length > 0) {
        req.flash('error', errors.array()[0].msg);
        return res.status(301).redirect('/login');
    }

    User.findOne({ email: req.body.email })
        .then(user => {
            const msg = "Invalid credentials!";
            if (user) {
                if (user.role === 's_admin') {
                    const doMatch = bcrypt.compareSync(req.body.password, user.password);
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
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};


exports.getDashboard = async (req, res, next) => {
    const todos = await Todos.find({}).populate('user')
    res.render('home', {
        title: "Dashboard",
        todos
    });
}
