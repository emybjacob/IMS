
require('./models/db')
const Product = require('./models/product')
const {  UserInputError } = require('apollo-server-express');



async function maxId()
{
    const id = await Product.findOne({}).sort({ id: -1 })
    .then((response)=> {
        console.log(JSON.stringify("id inside the ql  "+response.id))
        return !response?1:parseInt(response.id)+1;
    });
    return id;
}


// function validateIssue(employee) {
//     console.log(employee)
//     const errors = [];
//     if (employee.age < 20) {
//         errors.push('Age should be greater than 20')
//     }
//     if (employee.age > 70) {
//         errors.push('Age should be less than 70')
//     }
//     console.log(errors.length)
//     if (errors.length > 0) {
//         throw new UserInputError('Invalid input(s)', { errors });
//     }
// }


function productList()
{
    const products = Product.find({})
    .then((products)=> {
        return products;
    })
    return products;
}

// function BarcodeFind(){
//     const barcode_find = Barcode.findOne({barcode.barcode});
//     console.log(barcode_find);
// }



async function addProduct(_, {product}) {
    const prod = new Product(product);
    const newProd = await prod.save();
    console.log('product added', newProd);
    return newProd;
    
}

async function updateProduct(_, { product }) {
    const prod = new Product(product);
    const res = await Product.updateOne({id:product.id},product);
    console.log("Response___api/product.js"+JSON.stringify(res))
    return "updated";
}

async function getProduct(_, { id }) {
    const product = await Product.findOne({ id });
    return product;
}

async function deleteProduct(_, { id }) {
    await Product.deleteOne({id:id});
    return "deleted";
  }
  
module.exports = { addProduct, productList, getProduct, updateProduct,maxId, deleteProduct};