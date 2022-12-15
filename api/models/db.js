const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://fullstack:assignment@fscluster1.z3dws.mongodb.net/IMS?authSource=admin&replicaSet=atlas-k86e7c-shard-0&readPreference=primary&ssl=true');
mongoose.connection.on("connected", function(){    
    console.log("Application is connected to Databse");
})
