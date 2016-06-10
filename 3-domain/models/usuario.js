
module.exports = function(_mongoose) {
  var schema = _mongoose.Schema({
    cpf: {
      type: Number,
      required: true,
      index: {
        unique: true
      }
    },
    posicao_de_criacao: {
      type: Number,
      required: false
    },
    nome: {
      type: String,
      required: true
    },
    sobrenome: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    apelido: {
      type: String,
      required: false
    },
    perfil_usuario_id: {
      type: Number,
      required: true
    },
    rg: {
      type: Number,
      required: false
    },
    cnpj: {
      type: Number,
      required: false
    },
    email:{
        type: String,
        required: false
    },
    celular:{
        type: String,
        required: false
      },
    rua:{
        type: String,
        required: false
      },
    numero:{
        type: Number,
        required: false
      },
    cep:{
        type: Number,
        required: false
      },
    uf:{
        type: String,
        required: false
      },
    bairro:{
        type: String,
        required: false
      },
    cidade:{
        type: String,
        required: false
      },
    is_ativo:{
        type: Boolean,
        required: true
      },
    data_nascimento:{
        type: Date,
        required: false
      },
    nacionalidade:{
        type: String,
        required: false
      },
    data_criacao:{
        type: Date,
        required: false,
        default: Date.now
      },
    data_alteracao:{
        type: Date,
        required: false
      },
    facebook_token:{
        type: String,
        required: false
    },
    sexo:{
        type: String,
        required: false
    },
    foto_perfil_path:{
        type: String,
        required: false
    },
    foto_rg_path:{
        type: String,
        required: false
    },
    foto_residencia_path:{
        type: String,
        required: false
    },
    sobre_mim:{
        type: String,
        required: false
    }
  });

  return _mongoose.model('usuario', schema, 'usuario');
};

