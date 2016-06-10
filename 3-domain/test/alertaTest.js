// +---------------------------------+
// |          HELP - BDD             |
// +-----------+----------+----------+
// | PORTUGUES |  Ingles  | Mocha    |
// +-----------+----------+----------+
// | Dado que  |  Given   | describe | 
// | Quando    |  When    | context  |
// | Entao     |  Then    | it       |
// +-----------+----------+----------+

// ------------------------------------------------------------------CONFIG-01 GLOBAL
__dirDomain = '../../3-Domain/';

// ------------------------------------------------------------------CONFIG-02 TESTES
var assert   = require('assert');
var should   = require('should');
var winston  = require('winston');
var request  = require('supertest');
var url      = 'http://localhost:5000'
var Sync     = require('sync');

// ------------------------------------------------------------------CONFIG-03 SERVICOS
var empresaService        = require('../services/empresaService');
var clienteService        = require('../services/clienteService');
var equipeService         = require('../services/equipeService');
var dispositivoService    = require('../services/dispositivoService');
var usuarioService        = require('../services/usuarioService');
var equipeUsuariosService = require('../services/equipeUsuariosService');
var globaljs              = require("../app_modules/global");

// ------------------------------------------------------------------CONFIG-04 MOCKS
var _empresa_mock;
var _cliente_mock;
var _equipe_mock;
var _usuario_mock;
var _dispositivo_mock;
var _equipe_usuario_mock;



//
// Contexto dos Testes
//
describe('# ALERTA,', function() {
    
    //
    //this.timeout(30000);
    //
    
    //é executado ANTES de TODOS os testes
    before(function(done) {
      
        //
        // Preparacao do Ambiente para Teste
        // -----------------------------------------------------------
        Sync(function () {
                //
                // Empresa MOCK
                //
                empresa_modelo = { razao_social:'EMPRESA SOCIAL', is_fisica:0, usuario_create_id:1,
                    usuario_update_id:1, is_ativa:1, data_nascimento:'2016-01-01 01:00:00', };
                _empresa_mock = empresaService.create.sync(null, empresa_modelo).empresa;
                
                //
                // Equipe MOCK
                //
                _equipe_modelo = { empresa_id: _empresa_mock.id, equipe_id:0, nome:'EQUIPE TESTE', is_ativo:1, 
                    atende_fila:1,  equipe_tipo_id:1};
                _equipe_mock = equipeService.create.sync(null, _equipe_modelo).equipe;
                
                //
                // Cliente MOCK
                //
                _cliente_modelo = { empresa_id:_empresa_mock.id, equipe_id:0, razao_social:'CLIENTE TESTE', 
                    is_fisica:0, is_ativo:1, data_nascimento:'2015-01-01 01:00:00', data_criacao:'2015-01-01 01:00:00', 
                    data_atualizacao:'2015-01-01 01:00:00', usuario_create_id:1, usuario_update_id:2, 
                    is_sla:0, equipes:[_equipe_mock.id]};
                _cliente_mock = clienteService.create.sync(null, _cliente_modelo).cliente;
                
                //
                // Usuario MOCK
                //
                _usuario_modelo = { empresa_id:_empresa_mock.id, perfil_id:0, nome:'USUARIO TESTE', 
                    username:'teste@teste.mock', password:'teste123', is_admin:0, is_ativo:0, perfis:[] };
                _usuario_mock = usuarioService.create.sync(null, _usuario_modelo, _empresa_mock.id).usuario;
                
                //
                // Vincula o Usuario na Equipe
                //
                _equipe_usuario_modelo = { empresa_id:_empresa_mock.id, equipe_id: _equipe_mock.id,
                    usuario_id: _usuario_mock.id, is_lider:0 };
                _equipe_usuario_mock = equipeUsuariosService.create.sync(null, _equipe_usuario_modelo).equipeUsuario;

                //console.log('EMPRESA       : ' + _empresa_mock.id)
                //console.log('EQUIPE        : ' + _equipe_mock.id)
                //console.log('CLIENTE       : ' + _cliente_mock.id)
                //console.log('USUARIO       : ' + _usuario_mock.id)
                //console.log('USUARIO       : ' + _usuario_mock.token)
                //console.log('EquipeUSUARIO : ' + _equipe_usuario_mock.id)
                
                //
                // Dispositivo MOCK
                //
                
                done();
        });
      
    });
    
    
    // Dado que
    describe('Dado que o Dispositivo enviou um alerta,', function() {
        // Entao
        it('Entao deve ser retornado para o dispositivo um status de sucesso [status_code:200]', function(done) {
            
            var body = { alerta: { alerta_tipo_id : 1,
                                   titulo         : 'TITULO ALERTA - TESTE-BDD',
                                   descricao      : 'DESCRICAO ALERTA - TESTE-BDD',
                                   gravidade_id   : 1 } };
            request(url)
                .post('/api/Alerta')
                .set('token', _token_dispositivo)
                .send(body)
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function(err, response){
                    if(err){
                        throw err;
                    } else {
                        response.body.should.have.property('status_code');    // Tenha a propriedade X
                        response.body.status_code.should.equal(200);   // o campo X deve ser igual a y         
                        done();
                    }
                });                    
        });
        
             
        // Sendo que
        describe('Sendo este dispositovo do tipo : SERVIDOR,', function() {
            
            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo DESBLOQUEAR alertas de ORIGEM SERVIDOR,', function(done) {
                // Entao
                it('Entao este usuario deve ter um novo alerta nao lido na sua listagem de alertas.', function(done) {
                    assert.equal(true, true);
                    done();                 
                });
            });

            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo BLOQUEAR alertas de ORIGEM SERVIDOR,', function(done) {
                // Entao
                it('Entao este usuario NAO deve ter um novo alerta na sua listagem de alertas', function(done) {
                    assert.equal(true, true);
                    done();
                });
            });
        });
        
        // Dado que
        describe('Sendo este dispositovo do tipo : TERMINAL', function() {
            
            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo DESBLOQUEAR alertas de ORIGEM TERMIANL', function(done) {
                // Entao
                it('Entao este usuario deve ter um novo alerta nao lido na sua listagem de alertas', function(done) {
                    assert.equal(true, true);
                    done();
                });
            });
            
            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo BLOQUEAR alertas de ORIGEM TERMINAL', function(done) {
                // Entao
                it('Entao este usuario NAO deve ter um novo alerta na sua listagem de alertas', function(done) {
                    assert.equal(true, true);
                    done();
                });
            });
        });
        
        // Dado que
        describe('Sendo este dispositovo do tipo : MOBILE,', function() {
            
            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo DESBLOQUEAR alertas de ORIGEM MOBILE,', function(done) {
                // Entao
                it('Entao este usuario deve ter um novo alerta nao lido na sua listagem de alertas,', function(done) {
                    assert.equal(true, true);
                    done();
                });
            });
            
            // Quando
            context('Quando ouver usuario pertecente a uma equipe do cliente do dispositivo e o mesmo BLOQUEAR alertas de ORIGEM MOBILE,', function(done) {
                // Entao
                it('Entao este usuario NAO deve ter um novo alerta na sua listagem de alertas,', function(done) {
                    assert.equal(true, true);
                    done();
                });
            });
        });
        
    });
});
