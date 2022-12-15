const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userType = new Schema({
    role: String,
});


const UserType = mongoose.model('UserType', userType);
module.exports = UserType;
