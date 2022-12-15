const fs = require('fs');
require('dotenv').config();
const DateScalar = require('./graphqlDate.js');
const { ApolloServer } = require('apollo-server-express');
const barcode = require('./barcode.js')
const user = require('./user.js');
const userType = require('./userType.js');
const product = require('./product.js');
const { userInfo } = require('os');
const invoice = require('./invoice.js');
const resolvers = {
    
    DateScalar : DateScalar,

    Query: {
        userLogin: user.loginVerify,
        userList:user.userList,
        userTypeList:userType.userTypeList,
        BarcodeList: barcode.BarcodeList,
        productList: product.productList,
        getProduct: product.getProduct,
        maxIdProduct : product.maxId,
        getUser : user.getUser,
        getInvoice: invoice.getinvoice,
        invoiceList:invoice.invoiceList,
    },
    
    Mutation: {
        addUser: user.addUser,
        addBarcode: barcode.addBarcode,
        addProduct: product.addProduct,
        deleteProduct: product.deleteProduct,
        updateProduct: product.updateProduct,
        updateUser: user.updateUser,
        deleteUser:user.deleteUser,
        addInvoice: invoice.addinvoice,
        updateInvoice: invoice.updateinvoice,
    },
};

const server = new ApolloServer({
    typeDefs:fs.readFileSync('schema_graphql','utf-8'),
    resolvers,
    formatError: error => {
        console.log(error);
        return error;
    },
});

function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.start().then(() => {
        server.applyMiddleware({
            app,
            path: '/graphql',
            cors: enableCors,
        });
    });
}

module.exports = { installHandler };