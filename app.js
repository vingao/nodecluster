var express=require("express");
var app=express();
var perflogger = require('./perflogger1');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(perflogger(app));

app.get('/',function(req,res){
    // res['content-length'] won't work with res.end
    //res.end("GET: Hello world from " + process.pid);

    res.send("GET: Hello world from " + process.pid);
});

app.post('/',function(req,res){
    // res['content-length'] won't work with res.end
    //res.end("POST: Hello world from " + process.pid);

    res.send("POST: Hello world from " + process.pid);
});


app.listen(3000,function(){

    console.log("Running at PORT 3000");

});