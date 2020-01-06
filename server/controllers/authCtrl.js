const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const mailer = require('nodemailer');
const mailTransport = require('nodemailer-sendgrid-transport');
const transporter = mailer.createTransport(mailTransport({
    auth: {
        api_key: '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'
    }
}));

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.array().length > 0) {
        return res.status(422).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            const error = new Error('Bad cfffredentialsa!');
            error.statusCode = 401;
            return next(error);
        }
        if (!user.activated) {
            return res.status(401).json({ error: "Verify your emails to activate account!" });
        }
        const doMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!doMatch) return res.status(401).json({ error: "Invalid credentials!" });
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );
        return res.status(200).json({ token: token, userId: user._id.toString() });
    });
}

exports.postRegister = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (errors.array().length > 0) {
        return res.status(422).json({ errors: errors.array() });
    }

    const password = bcrypt.hashSync(req.body.password, 12);
    const email_token = Math.random().toString();
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        gender: req.body.sex,
        password,
        email_token
    })

    user.save(err => {

        if (err) {
            const er = new Error("Error on saving -------------------------------");
            er.status = 500;
            next(err);
            return;
        }
        res.status(201).json({ success: "SUCCESS" });

        return transporter.sendMail({
            to: user.email,
            sender: 'tidjani@spartiat.com',
            subject: 'Activate Account!',
            html: `<h1><a href="http://localhost:3000/activate/${email_token}"> Click me </a> to activate your account!</h1>  `,
            text: `Activation code link http://localhost:3000/activate/${email_token}!`
        }).catch(err => {

        });
    });
}

exports.activateAccount = async (req, res, next) => {
    const user = await User.findOne({ email_token: req.params.token });
    const newToken = Math.random().toString();
    if (user) {
        User.updateOne({ email_token: req.params.token }, {
            $set: {
                activated: true,
                email_token: newToken
            }
        }, (err, raw) => {
            if (!err) {
                return res.status(200).json({ success: "Account activation okay" })
            }
            return res.status(200).json({ failed: "Account activation failed" })
        })
    } else return res.status(204).json({ error: "Account not found" });
}
