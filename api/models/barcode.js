const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BarcodeSchema = new Schema({
    id : Number,
    barcode: String,
   
});



const Barcode = mongoose.model('Barcode', BarcodeSchema);
module.exports = Barcode;


