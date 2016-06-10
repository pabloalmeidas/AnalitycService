var Enum = require('enum')

var _perfilUsuario = new Enum(
	{
		'Diarista': 1,
        'Contratante': 2
	});

exports.perfilUsuario = _perfilUsuario;