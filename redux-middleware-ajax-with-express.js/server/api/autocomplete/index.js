var express = require("express");

var v1 = require("./v1/index");

var app = express.Router();

app.use("/v1", v1);

app.use(function (req, res, next) {
    //    res.writeHead(404);
    res.json({
        from: "autocomplete app",
        res: "invalid version"
    });
});

module.exports = app;