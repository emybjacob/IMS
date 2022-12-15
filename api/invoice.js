
require('./models/db')
const InvoiceDAO = require('./models/invoice')
const {  invoiceInputError } = require('apollo-server-express');

async function invoiceList()
{
    const invoices = await InvoiceDAO.find({}).populate('items')
    .then((invoices)=> {
        return invoices;
    })
    console.log("invoices.... "+JSON.stringify(invoices))
    return invoices;
}
async function addinvoice(_, { invoice }) {
    const newinvoice = new InvoiceDAO(invoice);
    const invoiceCreated = await (await newinvoice.save()).populate("items");
    console.log('created invoice... ', invoiceCreated);
    return invoiceCreated;
}

async function updateinvoice(_, { invoice }) {
    const res = await InvoiceDAO.updateOne({invoiceId:invoice.invoiceId},invoice);
    console.log("Response___api/invoice.js"+JSON.stringify(res))
    return "updated";
}

  async function deleteinvoice(_, { _id }) {
    await InvoiceDAO.deleteOne({_id:_id});
    return "deleted";
  }
  
  async function getinvoice(_, { id }) {
    console.log("_id to be found is "+id)
    const invoice = await InvoiceDAO.findOne({ invoiceId:id }).populate('items');
    return invoice;
  }
module.exports = { invoiceList, addinvoice, updateinvoice, deleteinvoice, getinvoice };