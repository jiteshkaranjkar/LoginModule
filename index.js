const express       = require('express');
const port          = process.env.PORT || 3000; // set the port
const app           = express();
const mongoose      = require('mongoose');
const config        = require('./config/database');
const path          = require('path');

mongoose.Promise = global.Promise; // use native mongoose promises (ES6 promise)
//connect to MongoDB database using mongoose
mongoose.connect(config.uri);//mongoose.connect('mongodb://localhost/testaroo');
mongoose.connection.on('connected', function(){ //on Database connection 
    console.log("Connected to database named - " + config.db);
}) 
mongoose.connection.on('error', function(err){//on Connection Error 
    console.log("Error conencting database - " + err);
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('/', (req, res) => {
    res.sendfile(__dirname + '/client/dist/index.html');
});

//Start Server
app.listen(port, function(){
    console.log("Server started at port - " + port);
});