const { response } = require("express");
const { verify, decode} = require('jsonwebtoken')
const validateJWT = ( req, res = response, next) => {
    
    const token = req.headers['x-token'];
    
    if(!token){
        return res.status(401).json({
            ok : false,
            msg : 'Es necesario enviar el token'
        })
    }

    try {
        const { id, username, email } = verify( token,process.env.SECRET_JWT );
            
            req.id_user = id;
            req.username = username;
            req.email = email
        
        
    } catch (error) {
        return res.status(401).json({
            ok : false,
            msg : 'El token es inválido'
        })
    }

    next()

}


module.exports = validateJWT