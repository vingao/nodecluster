var express=require("express");
var app=express();
var perflogger = require('./perflogger');

app.use(perflogger);

app.get('/',function(req,res){
    res.end("Hello world from " + process.pid);
});

app.listen(3000,function(){

    console.log("Running at PORT 3000");

});