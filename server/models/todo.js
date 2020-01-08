import { Schema, model } from 'mongoose';


const todoSchema = new Schema({
    title: {
        type: String, required: true
    },
    status: {
        type: Boolean, default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

export default model('Todo', todoSchema);
