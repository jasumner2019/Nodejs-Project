const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema)