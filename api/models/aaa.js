require('./db')
const userType = require('./userType')
const user = require('./user')
const product = require('./product')

function userTypeData() {
    const userTypes = [
        {
            role: "Admin",
        },
        {
            role: "Associate",
        },
        {
            role: "Supervisor",
        }
    ]
    console.log("aaa");
    userType.insertMany(userTypes);
}
function userData() {
    const users = [
        {
            userId: "emy", password: "password", userType: "63859c02945f49694c8ff14a", firstName:"Emy", lastName:"Baby Jacob", designation:"Manager"
        },
        {
            userId: "sharan", password: "password", userType: "63859c02945f49694c8ff14b", firstName:"Sai Sharan", lastName:"Kuntla", designation:"Manager"
        },
        {
            userId: "aksha", password: "password", userType: "63859c02945f49694c8ff14c", firstName:"Aksha", lastName:"Vyas", designation:"Manager"
        }
    ]
    user.insertMany(users);
}
function productData() {
    const products = [
        {
            id: 1,
            name: "Monitor",
            barcode: 9656962678,
            dateOfExpiry: new Date(2099, 11, 31),
            price: 120,
            quantity: 45,
        },
        {
            id: 2,
            name: "Mouse",
            barcode: 9744997853,
            dateOfExpiry: new Date(2099, 11, 31),
            price: 25,
            quantity: 87,
        },
        {
            id: 3,
            name: "Keyboard",
            barcode: 9895656259,
            dateOfExpiry: new Date(2099, 11, 31),
            price: 45,
            quantity: 66,
        },
    ]
    product.insertMany(products);
}
function aaa() {
    // userTypeData();
    userData();
    // productData();
    console.log("aaa is empty");

}

module.exports = { aaa };