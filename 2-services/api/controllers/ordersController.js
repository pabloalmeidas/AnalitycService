/* global __dirDomain */
var express         = require('express');
var ordersService   = require(__dirDomain + 'services/ordersService')
var router          = express.Router();
var filterHeaders   = require('../middlewares/filterHeaders')

// configura a validacao do token nesta rota
router.use(filterHeaders.token);

router.post('/', function(req, res) {
        if(req.body.order == undefined ||  req.body.order == null || req.body.order == ""){
            res.status(401).json({errorCode:401, error_msg:'order uninformed!'});
        }
        else{
            ordersService.save(req.token, req.body.order, function(erro, resp) {
                if (erro) {
                    res.status(erro.errorCode).json(erro);
                } else {
                    res.status(resp.statusCode).json(resp);
                }
          });
        }
});

module.exports = router;