var FileStreamRotator = require('file-stream-rotator')
var express = require('express')
var morgan = require('morgan')
var uuid = require('node-uuid')
var bodyParser = require('body-parser')
var logDirectory = __dirname + '/log'

//var app = express()

module.exports = function (app) {
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    morgan.token('id', function getId(req) {
        return req.id
    })

// my request length
    morgan.token('request-length', function getReqLength(req) {
        return req.reqlength;
    })

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    app.use(assignReqLength);

    app.use(assignId)

    var perfLogStream = FileStreamRotator.getStream({
        //filename: logDirectory + '/perf-%DATE%.log',
        filename: logDirectory + '/perf-' + process.pid + '-%DATE%.log',
        //frequency: 'daily',  // broken: https://github.com/holidayextras/file-stream-rotator/issues/9
        //frequency: '1h',
        verbose: false,
        //date_format: 'YYYYMMDD'
        date_format: 'YYYYMMDDHHmm'
    })

//app.use(morgan(':id :method :url :request-length :status :res[content-length] :response-time'))
//app.use(morgan(':date[iso] :id :method :url :request-length :status :res[content-length] :response-time', {stream: perfLogStream}))
//    app.use(morgan(':date[iso] :method :url :request-length :status :res[content-length] :response-time', {stream: perfLogStream}))


    function assignReqLength(req, res, next) {
        req.reqlength = req.headers['content-length'] ? parseInt(req.headers['content-length'], 10) : null;
        next();
    }


    function assignId(req, res, next) {
        req.id = uuid.v4()
        next()
    }

    return morgan(':date[iso] :id :method :url :request-length :status :res[content-length] :response-time ms', {stream: perfLogStream})
}


//module.exports = morgan(':date[iso] :id :method :url :request-length :status :res[content-length] :response-time', {stream: perfLogStream})