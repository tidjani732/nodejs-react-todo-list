import { validationResult } from 'express-validator';

import Todo from '../models/todo';
import User from '../models/user';
import { getSocket } from '../util/socket';

export async function getTodos(req, res, next) {
    try {
        const todos = await Todo.find({
            $or: [
                { user: req.userId },
                { 'assigned_to': req.userId }
            ]
        }).populate('assigned_to', 'name');
        return res.status(200).json({ todos });
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
    try {
        await Todo.deleteOne({ _id: req.body._id })
        getSocket().emit("assigned_todo", { _id: req.body._id }, "A todo has been deleted!");
        res.status(200).json({ success: "Deleted" })
    } catch (err) {
        next(err);
    }
}

export async function updateTodos(req, res, next) {
    try {

        var seter = {}
        if (req.body.title) seter.title = req.body.title;
        if (req.body.status) seter.status = req.body.status;
        if (req.body.assigned_to) seter.assigned_to = req.body.assigned_to;
        if (req.file) {
            const tod = await Todo.findOne({ _id: req.body._id });
            if (tod) {
                const images = tod.images || [];
                seter.images = [...images, req.file.path]
            }
        }
        await Todo.updateOne({ _id: req.body._id }, {
            $set: seter
        });
        const todo = await Todo.findOne({ _id: req.body._id }).populate('assigned_to', 'name');
        if (todo && todo.assigned_to && todo.assigned_to._id) {
            const user = await User.findById(todo.assigned_to._id);
            if (user) {
                getSocket().emit("assigned_todo", todo, `Todo updated and assigned to ${user.name}`, user._id)
            }
        }
        return res.status(200).json({ success: "Updated", todo })
    } catch (err) {
        next(err);
    }
}
