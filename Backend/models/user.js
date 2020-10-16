var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User model.
var user = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        validate: /[a-z]/,
        min: [4, 'firstName must be atleast 4 character long '],
        required: [true, "FirstName is required"]
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        validate: /[a-z]/,
        min: [4, 'firstName must be atleast 4 character long '],
        required: [true, "lastName is required"]
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "email is required"]
    },

    password: {
        type: String,
        trim: true,
        min: [8, 'password must be atleast 8 character long '],
        required: [true, "password is required"]
    },
    photoURL: String,
    resetToken: String,
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    group: [
        {
            type: Schema.Types.ObjectId,
            ref: "group",
        }
    ],
    socketId: String

}, { timestamps: true });

let User = mongoose.model('user', user);

module.exports = User;