var mongoose = require('mongoose');
const env = require('dotenv').config();   //Use the .env file to load the variables
const express = require('express')
const cors = require('cors')
const userModel = require('./models/userModel')
const userRoutes = require('./routes/userRoutes')
const groupRoutes = require('./routes/groupRoutes')
mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
 })
 .then(() => console.log('Connection to CosmosDB successful...'))
 .catch((err) => console.error(err));

var app = express();

app.use(express.json(),cors("*"))
app.use('/api/users', userRoutes)
app.use('/api/groups', groupRoutes)
app.listen(process.env.SERVER_PORT,()=>console.log(`Server running on port ${process.env.SERVER_PORT}...`))