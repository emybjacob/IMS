require('./models/db')
const Barcode = require('./models/barcode')
const {  UserInputError } = require('apollo-server-express');



function BarcodeList()
{
    const barcodes = Barcode.find({})
    .then((barcodes)=> {
        return barcodes;
    })
    return barcodes;
}

// function BarcodeFind(){
//     const barcode_find = Barcode.findOne({barcode.barcode});
//     console.log(barcode_find);
// }



async function addBarcode(_, {barcode}) {
    const code = new Barcode(barcode);
    const newBarcode = await code.save();
    // const data = await Barcode.findOne({ barcode: barcode });
    console.log('barcode added', newBarcode);
    return newBarcode;
    
}

  
module.exports = { addBarcode, BarcodeList};