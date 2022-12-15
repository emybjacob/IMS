
require('./models/db')
const UserTypeDAO = require('./models/userType')
const {  UserInputError } = require('apollo-server-express');

async function userTypeList()
{
    const roles = UserTypeDAO.find({})
    .then((roles)=> {
        return roles;
    })
    return roles;
}
module.exports = { userTypeList};