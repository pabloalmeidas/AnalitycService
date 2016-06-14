exports.token = function (req, res, next) {

  if(req.headers['x-wevo-api-token'])
  {
      var X_WEVO_API_Token = req.headers['x-wevo-api-token'];
      
      if(X_WEVO_API_Token == 'test'){
           
           req.token = { "tokenString": X_WEVO_API_Token,
                         "elasticsearch":{ host:"https://search-wevoanalytic-e7vnt6cy7l33gyuw3oanwg6ksu.us-east-1.es.amazonaws.com", log:"trace" } 
                       }
           next();
      }
      else{
            res.status(404).json({error_code : 404, error_msg: "x-wevo-api-token invalido!"});
      }
  }
  else{
        res.status(404).json({error_code : 404, error_msg: "x-wevo-api-token nao informado!"});
  }
}