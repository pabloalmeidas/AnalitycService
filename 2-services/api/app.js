// TESTE //
/* global _tempoAtualizacaoDispositivos */
/* global apicache */
/* global __dirDomain */
var express                   = require('express');
var path                      = require('path');
var logger                    = require('morgan');
var cookieParser              = require('cookie-parser');
var bodyParser                = require('body-parser');
var crypto                    = require("crypto");
var multipart                 = require('connect-multiparty')
var cors                      = require('cors');
var app                       = express();
__dirDomain                   = __dirname + '/../../3-domain/';

var globaljs                  = require(__dirDomain + "app_modules/global");
__diInfra                     = __dirname + '/../../4-infra/';

var env_ambiente = process.argv[2] || 'test' ;
var config       = require(__diInfra + 'config/config')[env_ambiente];

//
// Middleware de CACHE
//
apicache = require('apicache').options({ debug: true }).middleware;


//
// Configuracao dos Requests do app
//
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(multipart());
var allowsCors = function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, token");
    res.header("Access-Control-Allow-Credentials", "true");
    if ('OPTIONS' == req.method) {
        //console.log("entrei no OPTIONS");
        return res.send(200);
    }
    next();
};
app.use(allowsCors);

// ======================================================================
// Rotas / Controllers
// ======================================================================
//
app.use('/analitycs/orders/',    require('./controllers/ordersController'));



module.exports = app;
