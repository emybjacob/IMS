const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const invoice = new Schema({
    invoiceId: String,
    items: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
    }],
});

const Invoice = mongoose.model('Invoice', invoice);
module.exports = Invoice;
