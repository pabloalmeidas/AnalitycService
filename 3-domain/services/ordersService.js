var elasticsearch = require('elasticsearch');


function _save(_token, _order,  _callback) {
    try{

        // Valida campos obrigatorios
        if(_order.instance == undefined || _order.instance == "" || _order.instance == null ){
            _callback({errorCode:401, error_msg:'order.instance uninformed!'} );
        }

        if(_order.tenant == undefined || _order.tenant == "" || _order.tenant == null ){
            _callback({errorCode:401, error_msg:'order.tenant uninformed!'} );
        }

        // grava no Elastic
        var client = new elasticsearch.Client({
            host: _token.elasticsearch.host,
            log: _token.elasticsearch.log
        });
        client.index({
            index: _order.tenant,
            type: 'orders',
            body: _order
        }, function (_error, _response) {
            if(_error){
                _callback({errorCode:401, error_msg:'Error writing order, ' + _error} );  
            }
            else{
                _callback(null, {statusCode:200});  
            }
        });
    }
    catch(_err){
        _callback({errorCode:501, error_msg:'unexpected error in orderService._save(), ' + _err} );
    }
};
exports.save = _save;