/* global __dirDomain */
var express         = require('express');
var ordersService = require(__dirDomain + 'services/ordersService')
var router          = express.Router();
var filtroToken     = require('../middlewares/validaToken')

// configura a validacao do token nesta rota
router.use(filtroToken.validaToken);

router.get('/totaldevendasnoperiodo', function(req, res) {        
        ordersService.totalDeVendasNoPeriodo(req.user_token, function(erro, resp) {
            if (erro) {
                res.status(erro.error_code).json(erro);
            } else {
                res.status(resp.status_code).json(resp);
            }
        });
});

module.exports = router;