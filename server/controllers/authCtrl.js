import { compareSync, hashSync } from 'bcryptjs';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import mailer from 'nodemailer';
import mailTransport from 'nodemailer-sendgrid-transport';

import User from '../models/user';
import logger from "../util/logger";


const transporter = mailer.createTransport(mailTransport({
    auth: {
        api_key: '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'
    }
}));

export async function postLogin(req, res, next) {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            const error = new Error('Bad credentials!');
            error.statusCode = 401;
            return next(error);
        }
        if (!user.activated) {
            return res.status(401).json({ error: "Verify your emails to activate account!" });
        }
        const doMatch = compareSync(req.body.password, user.password);
        if (!doMatch) return res.status(401).json({ error: "Invalid credentials!" });
        const token = sign(
            {
                email: user.email,
                userId: user._id.toString()
            },
            process.env.JWT_SECRET,
            { expiresIn: '5d' }
        );
        return res.status(200).json({ token: token, userId: user._id.toString() });

    } catch (err) {
        next(err);
    }
}

export async function postRegister(req, res, next) {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        return res.status(422).json({ errors: errors.array() });
    }

    const password = hashSync(req.body.password, 12);
    const email_token = Math.random().toString();
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        gender: req.body.sex,
        password,
        email_token
    })

    try {
        await user.save()

        res.status(201).json({ success: "SUCCESS" });
        return transporter.sendMail({
            to: user.email,
            sender: 'valaniel@gems.com',
            subject: 'Activate Accoun!',
            html: `<h1><a href="http://localhost:3000/activate/${email_token}"> Click me </a> to activate your account!</h1>  `,
            text: `Activation code link : http://localhost:3000/activate/${email_token} `
        }, (err, info) => {
            if (err) logger.error(err);
            else logger.info(info)
        })
    } catch (er) {
        next(err);
    };
}

export async function activateAccount(req, res, next) {
    try {
        const user = await User.findOne({ email_token: req.params.token });
        const newToken = Math.random().toString();
        if (user) {
            await User.updateOne({ email_token: req.params.token }, {
                $set: {
                    activated: true,
                    email_token: newToken
                }
            })
            res.status(200).json({ success: "Account activation okay" })
        } else return res.status(204).json({ error: "Account not found" });
    } catch (err) {
        res.status(204).json({ failed: "Account activation failed" })
    }
}

export async function getUsers(req, res, next) {
    try {
        const users = await User.find({}).select("name");
        res.status(200).json({ users });
    } catch (err) {
        res.status(204).json({ failed: "Account activation failed" })
    }
}
