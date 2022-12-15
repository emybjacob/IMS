const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const user = new Schema({
    userId: String,
    password: String,    
    userType: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'UserType'
    },
    firstName: String,
    lastName: String,
    designation: String,
});


const User = mongoose.model('User', user);
module.exports = User;
