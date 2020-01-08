import { validationResult } from 'express-validator';

import Todo from '../models/todo';

export async function getTodos(req, res, next) {
    try {
        const todos = await Todo.find({ user: req.userId })
        return res.status(200).json({todos});
    } catch (err) {
        next(err);
    }
}

export async function postTodos(req, res, next) {
    const errors = validationResult(req);
    if (errors.array().length > 0) {
        console.log("Errors  ", errors);
        return res.status(422).json({ errors: errors.array() });
    }

    var todo = new Todo({
        title: req.body.title,
        user: req.userId
    })
    try {
        await todo.save()
        return res.status(201).json({ todo });
    } catch (err) {
        next(err)
    }
}

export async function deleteTodos(req, res, next) {
    try{
        await Todo.deleteOne({ _id: req.body._id })
        res.status(200).json({ success: "Deleted" })
    }catch(err) {
        next(err);
    }
}

export async function updateTodos(req, res, next) {
    try {
        await Todo.updateOne({ _id: req.body._id },
            {
                $set: {
                    title: req.body.title,
                    status: req.body.status
                }
            })
        return res.status(200).json({ success: "Updated" })
    } catch (err) {
        next(err);
    }
}
