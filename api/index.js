const express = require("express");
require('dotenv').config();
const app = express();
const aaa = require('./models/aaa.js');
const port = process.env.API_SERVER_PORT || 3000;
const {installHandler} = require('./graphql_api.js')
installHandler(app);
(async function () {
    try {
      aaa.aaa();
      app.listen(port, function () {
        console.log(`API server started on port ${port}`);
      });
    } catch (err) {
      console.log('ERROR:', err);
    }
  }());

//   /* Student Id : 8759314 */