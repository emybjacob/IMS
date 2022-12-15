const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const product = new Schema({
    id:Number,
    name : String,
    barcode : String,
    dateOfExpiry: {type: Date, default: new Date()},
    price : Number,
    quantity : Number,
});


const Product = mongoose.model('Product', product);
module.exports = Product;
