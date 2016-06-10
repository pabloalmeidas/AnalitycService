var dbox = require("dbox")
//var fs = require("fs")
var prompt = require("prompt")
var path = require('path')
var helpers = require("./node_modules/dbox/test/config/helpers")

var env_ambiente = 'test' ;
if(process.argv[2]){
    if(process.argv[2].indexOf('.js') == -1){
        env_ambiente = process.argv[2];
    }
}

var config = require(__dirname + '/4-infra/config/config.json')[env_ambiente];

var funcao = function () {
	var client = module.exports;
	//var root = process.env.ROOT || "dropbox"
	var appToken = config.dropbox;
	var access_token = config.access_token_dropbox;
	//var appToken = JSON.parse(fs.readFileSync(__dirname + "/node_modules/dbox/test/config/" + root + "/app.json"))
	//var access_token = JSON.parse(fs.readFileSync(__dirname + "/node_modules/dbox/test/config/" + root + "/access_token.json"))
	var app = dbox.app(appToken);

	return client = module.exports = app.client(access_token);
} ();
exports.client = funcao;