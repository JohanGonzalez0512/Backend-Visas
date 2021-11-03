const { sign } = require('jsonwebtoken');
const createJWT = (id, username, email) => {
    return new Promise((resolve, reject) => {
        const payload = { id, username, email };

        sign(payload, process.env.SECRET_JWT, {
            expiresIn: '3h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token)
        })
    })

}


module.exports = {
    createJWT
}