#!/usr/bin/env node

var app          = require('../app');
var debug        = require('debug')('diarist:server');
var http         = require('http');
var env_ambiente = process.argv[2] || 'test' ;
var port         = 8080;
app.set('port', port);

//process.env.TZ = 'America/Brasilia';
//process.env.TZ = 'UTC'
process.env.TZ = 'America/Sao_Paulo';
//process.env.TZ = '+00:00'



// =============================================
// Configuracao do modo - CLUSTER
// =============================================
//
if(env_ambiente == 'production')
{
		var cluster = require('cluster');
		var numCPUs = require('os').cpus().length;
		
		if (cluster.isMaster) 
        {
			//
			// trabalhadores
			//
			console.log()
			console.log("Total de Processadores : ", numCPUs)
			for (var i = 0; i < numCPUs; i++) {
				cluster.fork();
                // cluster.fork().on('online', function(worker) {
			    //      // Worker is online
			    //      console.log("Cluster-work [online] ", worker)
			    // });
			}
            
            //
            // Delegates para os eventos no cluster
            //
			cluster.on('fork', function(worker) {
                    console.log("Cluster-work  :  ID  [  " + worker.id  + " ]   PID [  " + worker.process.pid + " ]")
            });
			cluster.on('exit', function(worker, code, signal) {
				console.log('worker ' + worker.process.pid + ' died');
			});
            cluster.on('listening', function(worker, address) {
                //console.log("Um Cluster-worker agora esta conectado ao " + address.address + ":" + address.port);
            });
            
		} 
        else 
        {
			
			// Os trabalhadores podem compartilhar qualquer conexão TCP
			// Neste caso, é um servidor HTTP
			// http.createServer(function(req, res) {
			//   res.writeHead(200);
			//   res.end("hello world\n");
			// }).listen(8000);
			
			//
			// escuta na porta fornecida, em todas as interfaces de rede.
			//
			var server = http.createServer(app);
			server.listen(port);
			server.on('error', onError);
			server.on('listening', onListening);
		}
}
else {
		// ===========================================================
		// Start o node em um unico processo em 1 processador
		// ===========================================================
		var server = http.createServer(app);
		server.listen(port);
		server.on('error', onError);
		server.on('listening', onListening);
		// ===========================================================
}


// ===========================================================
// Ouvinte de eventos para o servidor HTTP evento "erro".
// ===========================================================
//
function onError(error) {

  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requer privilégios elevados');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' já está em uso');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// ===========================================================
// Ouvinte de eventos para o servidor HTTP "escuta" do evento.
// ===========================================================
// 
function onListening() {

  console.log()
  console.log(" -> Servidor...: Wevo - AnalyticsService - STARTED")
  console.log(" -> Porta......: " + port)
  console.log(" -> Ambient....: " + env_ambiente)
  console.log()

}
