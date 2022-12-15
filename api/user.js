
require('./models/db')
const UserDAO = require('./models/user')
const {  UserInputError } = require('apollo-server-express');




async function loginVerify(_, { user }) {
    var filter = { userId: "", password:"" };
    console.log("user  ____"+JSON.stringify(user))
        filter.userId = user.userId;
        filter.password = user.password;
        console.log("user filter  ____"+JSON.stringify(filter));
        const loggedinuser = await UserDAO.findOne({userId:user.userId, password: user.password}).populate('userType')
        // loggedinuser.userType = await UserDAO.findOne({userId:user.userId, password: user.password}).populate('userType')
        console.log("response  ____"+JSON.stringify(loggedinuser));
        console.log("response  ____"+loggedinuser);
        return loggedinuser;
}

async function userList()
{
    const users = await UserDAO.find({}).populate('userType')
    .then((users)=> {
        return users;
    })
    console.log("users.... "+JSON.stringify(users))
    return users;
}
async function addUser(_, { user }) {
    const newUser = new UserDAO(user);
    const userCreated = await (await newUser.save()).populate("userType");
    console.log('created user... ', userCreated);
    return userCreated;
}

async function updateUser(_, { user }) {
    const res = await UserDAO.updateOne({_id:user._id},user);
    console.log("Response___api/product.js"+JSON.stringify(res))
    return "updated";
}

  async function deleteUser(_, { _id }) {
    await UserDAO.deleteOne({_id:_id});
    return "deleted";
  }
  
  async function getUser(_, { id }) {
    console.log("_id to be found is "+id)
    const user = await UserDAO.findOne({ _id:id }).populate('userType');
    return user;
  }
module.exports = { loginVerify ,userList, addUser, updateUser, deleteUser, getUser };