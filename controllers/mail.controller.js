const getRandomArbitrary = require("../helpers/creation-code");
const getExpirationDate = require("../helpers/getExpirationDate");
const { User } = require("../models/index");
const Restore_password = require("../models/restore_password.model");
const nodemailer = require('nodemailer');


const createAndSendCode = async (req, res) => {

    const { email } = req.body;
    const code = getRandomArbitrary(100000, 999999)
    const date_expiration = getExpirationDate()
    try {
        const user = User.findOne({
            where: { email }
        })
        if (user) {
            const { id_user } = user
            let restore_password = await Restore_password.findOne({
                where: {
                    id_user
                }
            })
            restore_password = await Restore_password.update({code:code.toString(), date_expiration})

            // mandar codigo al correo
            let transporter = nodemailer.createTransport({
                host: 'smtp-mail.outlook.com',                  // hostname
                service: 'outlook',                             // service name
                secureConnection: false,
                tls: {
                    ciphers: 'SSLv3'                            // tls version
                },
                port: 587,                                      // port
                auth: {
                    user: "jopi05122001@outlook.com",
                    pass: "Gosling012"
                }
              });
              
              const mensaje = `Buenas tardes nos acaba de llegar una solicitud para la recuperacion de contraseña.
                                El siguiente codigo es para poderla restaurarla, solo sera valido por 15 minutos.
                                Codigo: ${ code }`;
              
              const  mailOptions = {
                from: 'jopi05122001@outlook.com',
                to: 'jopi20101@gmail.com',
                subject: 'Restaurar contraseña',
                text: mensaje
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email enviado: ' + info.response);
                }
              });
        }else {
            return res.status(404).json({
                msg: 'No existe un pago con el id' + id
            });
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

//TODO: HACERLO MIDDLEWARE
const evaluateCode = async (req, res)=> {
    const { code } = req.body
    const restore_password = await Restore_password.findOne({
        where:{code}
    })
    if (restore_password) {

        
    
    }
}
module.exports = {
    createAndSendCode

}







// si existe
// sea menor a la fecha que tener
// before

//TODO: HACER TABLA DE CONTRASEÑA PARA EL CODIGO DE RECUPERACION Y MANDARLO
//PODRIAS HACER UNA VERIFICACION DE CORREO PARA QUE LO ESCRIBA PERO COMO PUEDAS GG
