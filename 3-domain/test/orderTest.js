// ------------------------------------------------------------------CONFIG-01 GLOBAL
__dirDomain  = '../../3-Domain/';

// ------------------------------------------------------------------CONFIG-02 TESTES
var assert   = require('assert');
var should   = require('should');
var winston  = require('winston');
var request  = require('supertest');
var url      = 'http://localhost:8080'
var Sync     = require('sync');

// ------------------------------------------------------------------CONFIG-03 SERVICOS
//var orderService          = require('../services/orderService');

// ------------------------------------------------------------------CONFIG-04 MOCKS
var _token    = "test";
var _tenant   = "tenant-labs";
var _instance = "instance-labs";


describe('# ORDER,', function() {
    
    it('/analitycs/orders/ [POST] deve gravar um novo pedido(order) recebendo [order no body] e retornar o statusCode 200 em caso de sucesso.', function(done) {

            var body = { order: { "tenant":"tenant-labs", "instance":"instance-labs", "orderId"  : "v1099744mltr-02", "sequence" : "1099744", } };    
            request(url)
                .post('/analitycs/orders/')
                .set('x-wevo-api-token', _token)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function(err, response){
                    if(err){
                        throw err;
                    } else {
                        response.body.should.have.property('statusCode');    // Tenha a propriedade X
                        response.body.statusCode.should.equal(200);          // o campo X deve ser igual a y         
                        done();
                    }
                });                    
        });
});
