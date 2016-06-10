exports.validaToken = function (req, res, next) {

  if(req.headers['token'])
  {
      var tokenString = req.headers['token'];
      var token = {};
      
      if(tokenString == "token-sony"){
            token = { database:"sony" }
            req.user_token = token;
            next();
      }
      else if(tokenString == "token-cea"){
            token = { database:"cea" }
            req.user_token = token;
            next();
      }
      else{
            res.status(404).json({error_code : 404, error_msg: "Token invalido!"});
      }
  }
  else{
        res.status(404).json({error_code : 404, error_msg: "Token nao informado!"});
  }
}
