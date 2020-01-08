import { Schema, model } from 'mongoose';


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    email_token: {
        type: String
    },
    activated: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'client'
    },
});

export default model('User', userSchema);
