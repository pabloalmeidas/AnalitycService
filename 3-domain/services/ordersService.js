var Usuario         = require('../models/_context').usuario;

//
// Total de vendas no periodo
//
function _totalDeVendasNoPeriodo(token, callback) {
    if(token.database == "sony"){
        callback(null, {status_code:200, total:999000} );
    }
    else if(token.database == "cea"){
        callback(null, {status_code:200, total:20000} );
    }
    else{
        callback({error_code:401, error_msg:'Database nao encontrado!'} );
    }
};
exports.totalDeVendasNoPeriodo = _totalDeVendasNoPeriodo;