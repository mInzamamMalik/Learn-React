var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var validator = require("express-validator");

let app = express.Router();

app.use(bodyParser.json())
app.use(validator())

//////////////schema and model///////////////////////////////////////////
var roomSchema = new mongoose.Schema({
    name: String,
});
var roomModel = mongoose.model("room", roomSchema);
//////////////schema and model//////////////////////////////////////////

app.get('/rooms', function (req, res, next) {
    roomModel.find({})
        .sort({ _id: -1 })
        .exec(function (err, data) {
            if (err) {
                return res.send("error in finding")
            } else {
                return res.json(data)
            }
        })
})

app.post('/rooms', function (req, res, next) {

    req.checkBody('name', 'Invalid name in body').notEmpty()
    var errors = req.validationErrors()
    if (errors) return next(errors)

    var newRoom = new roomModel({
        name: req.body.name
    }).save(function (err, data) {
        if (err) return next(err)
        return res.json(data)
    })
})

app.use("/", function (req, res, next) {
    //   res.writeHead(404);
    res.json({
        from: "autocomplete app",
        version: "v1",
        res: "request not found"
    });
});
module.exports = app;