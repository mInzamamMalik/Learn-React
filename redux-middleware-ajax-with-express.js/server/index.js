var express = require("express");
var mongoose = require("mongoose")
var cors = require('cors');

var autocomplete = require("./api/autocomplete/index");

var app = express();
var port = process.env.PORT || 4000;
app.use(cors());

app.use("/autocomplete", autocomplete);

app.use("/", (req, res, next) => {
    res.json({ "success": "Server is up and running" })
});

app.listen(port, function () {
    console.log('listening at: ' + port);
});

/////////////////////////////////////////////////////////////////////////////////////////////////
let dbURI = "mongodb://malikasinger:pakistan@ds149049.mlab.com:49049/malikasinger-demo";
// let dbURI = 'mongodb://localhost/mydatabase';
mongoose.connect(dbURI);

////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
    // process.exit(1);
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
}); 

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////
