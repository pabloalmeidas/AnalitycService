/* global exec */
require('shelljs/global');
var env_ambiente         = process.argv[2] || '' ;
var up_down_create       = process.argv[3] || '' ;
var dbmigrate            = "sequelize db:migrate --url ";
var config_path          = __dirname + '/4-infra/config/config.json';

if(env_ambiente == "--create")
{
    var master_log       = process.argv[4] || '--master' ;
    var path_migration   = __dirname + "/4-infra/migration-master"
    
    if(master_log == "--log"){
        path_migration = __dirname + "/4infra/migration-log";
    }
        
    var comand_create_migration = "sequelize migration:create --name '" +
                                  up_down_create                        + 
                                  "'"                                   +
                                  " --config '"                         +
                                  config_path                    + "' " + 
                                  "--migrations-path "                  +
                                  path_migration;

    console.log()
    console.log('Criando migrations GuardianServer...')

    var resp_create = exec( comand_create_migration );

    console.log()
    console.log()

    if(resp_create.code !== 0) {
        console.log('[ x ] Migration [ ' + up_down_create + ' ] ERRO criar...')
        console.log()
        console.log(resp_create)
    } else {
        console.log('[ √ ] Migration [ ' + up_down_create + ' ] Criada com Sucesso!')
    }

    console.log()
    console.log()                                
}
else
{
    var config = require(__dirname + '/4-infra/config/config.json')[env_ambiente];
    if(up_down_create == '--down')
    {
        dbmigrate = "sequelize db:migrate:undo --url "
    }

    var url_conection_master = config.master.dialect  + "://" + 
                               config.master.username + ":"   +
                               config.master.password + "@"   +
                               config.master.host     + ":"   +
                               config.master.port     + "/"   +
                               config.master.database;
                            
    var url_conection_log    = config.log.dialect  + "://" + 
                               config.log.username + ":"   +
                               config.log.password + "@"   +
                               config.log.host     + ":"   +
                               config.log.port     + "/"   +
                               config.log.database;
                            
    var migration_master     = dbmigrate                     +
                                url_conection_master         + 
                                " --migrations-path "        + 
                                __dirname                    + 
                                "/4-infra/migration-master";
                                
    var migration_log        =  dbmigrate                    +
                                url_conection_master         + 
                                " --migrations-path "        + 
                                __dirname                    + 
                                "/4-infra/migration-log";


                                
                                
    // 
    // Executa o comando external - synchronously 
    // 
    console.log()
    console.log('Iniciando migrations GuardianServer...')

    var resp_master = exec( migration_master );
    var resp_log    = exec( migration_master );

    console.log()
    console.log()

    if(resp_master.code !== 0) {
        console.log('[ x ] Migration MASTER nao foi executada')
        console.log(resp_master)
    } else {
        console.log('[ √ ] Migration MASTER Executada com Sucesso!')
    }

    if(resp_master.code !== 0) {
        console.log('[ x ] Migration LOG    nao foi executada')
        console.log(resp_master)
    } else {
        console.log('[ √ ] Migration LOG    Executada com Sucesso!')
    }

    console.log()
    console.log()

}
