'use strict';
var fs           = require('fs');
var path         = require('path');
var env_ambiente = 'test' ;
if(process.argv[2]){
    if(process.argv[2].indexOf('.js') == -1){
        env_ambiente = process.argv[2];
    }
}
// var config    = require(__dirname + '/../../4-infra/config/config.json')[env_ambiente];
// var mongoose  = require('mongoose');
// var uri       = config.mongodb.database; 


// mongoose.set('debug', false);
    


// mongoose.connection.on('connected', function() {
//     console.log('Mongoose> Conectado em  : [ ' + uri + ' ]');
// });

// mongoose.connection.on('disconnected', function() {
//     console.log('Mongoose> Desconectado de  : [ ' + uri + ' ]');
// });

// mongoose.connection.on('error', function(erro) {
//     console.log('Mongoose> Erro na conexão : ' + erro);
// });

// process.on('SIGINT', function() {
//     mongoose.connection.close(function() {
//         console.log('Mongoose>  Desconectado pelo término da aplicacao!');   
//         // 0 indica que a finalização ocorreu sem erros
//         process.exit(0);
//     })
// });

// mongoose.connect(uri);

//
// Models
// 
//exports.usuario = require('../models/usuario')(mongoose);
