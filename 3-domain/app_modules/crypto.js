var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'bt87rewrtgwe78rbwe78rg7webrg7ew8re7tr6';


exports.cripTexto = function (text) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(text.toString(), 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

exports.descTexto = function (text) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = decipher.update(text.toString(), 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

exports.cripBuffer = function (buffer) {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

exports.descBuffer = function (buffer) {
    var decipher = crypto.createDecipher(algorithm, password)
    var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return dec;
}