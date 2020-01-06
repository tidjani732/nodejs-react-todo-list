const { validationResult } = require('express-validator');

const Todo = require('../models/todo')

exports.getTodos = (req, res, next) => {
    Todo.find({ user: req.userId }, (err, todos) => {
        if (!err) return res.status(200).json({ todos });
        next(err);
    })
}

exports.postTodos = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        console.log("Errors  ", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    var todo = new Todo({
        title: req.body.title,
        user: req.userId
    })

    todo.save((err) => {
        if (err) return next(err)
        return res.status(201).json({ todo });
    })


}

exports.deleteTodos = async (req, res, next) => {
    Todo.deleteOne({ _id: req.body._id }, err => {
        if (err) next(err);
        else return res.status(200).json({ success: "Deleted" })
    })
}

exports.updateTodos = (req, res, next) => {
    console.log(req.body);

    Todo.updateOne({ _id: req.body._id },
        {
            $set: {
                title: req.body.title,
                status: req.body.status
            }
        }, (err, raw) => {
            if (!err) {
                return res.status(200).json({ success: "Updated" })
            }
            next(err);
        })
}
