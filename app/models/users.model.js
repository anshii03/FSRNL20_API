const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "fullname is not present"]
    },
    email: {
        type: String,
        unique: [true, "email already exists in the DB"],
        required: [true, "email is not present"],
        lowercase: true
    },
    role: {
        type: String,
        enum: ["normal", "admin"]
    },
    password: {
        type: String,
        required: true
    }
});

const UsersModel = mongoose.model('User', usersSchema);

module.exports = UsersModel;
