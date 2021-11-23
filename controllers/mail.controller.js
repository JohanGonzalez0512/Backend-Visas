const getRandomArbitrary = require("../helpers/creation-code");
const getExpirationDate = require("../helpers/getExpirationDate");
const { User } = require("../models/index");
const Restore_password = require("../models/restore_password.model");
const nodemailer = require('nodemailer');
require('dotenv').config()
const bcrypt = require("bcrypt");


const createAndSendCode = async (req, res) => {

    const { email } = req.body;
    let code = getRandomArbitrary(100000, 999999)
    code = code.toString();

    const expiration_date = getExpirationDate()
    //console.log(date_expiration, code)
    try {
        const user = await User.findOne({
            where: { email }
        })
        if (user) {
            const { id_user } = user
            //console.log(id_user);
            let restore_password = await Restore_password.findOne({
                where: {
                    id_user
                }
            })
            if (!restore_password) {
                return res.status(404).json({
                    ok: false,
                    msg: 'No existe un registro con ese email'
                });
            }
            
            await restore_password.update({
                code:code.toString(),
                expiration_date,
            })
           
            //console.log(restore_password)
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
                    user: process.env.EMAIL_USER_FROM,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            const mensaje = `Buenas tardes nos acaba de llegar una solicitud para la recuperacion de contraseña.
El siguiente codigo es para poderla restaurarla, solo sera valido por 15 minutos.
Codigo: ${code}`;

            const mailOptions = {
                from: process.env.EMAIL_USER_FROM,
                to: process.env.EMAIL_TO,
                subject: 'Restaurar contraseña',
                text: mensaje
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error)
                    return res.status(404).json({
                        ok: false,
                        msg: 'Hubo un problema con el correo'
                    });
                } else {
                    console.log('Email enviado: ' + info.response);
                    return res.status(200).json({
                        ok: true,
                        msg: "Correo enviado correctamente"
                    })
                }
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const resetPassword = async (req, res) => {
    const { code } = req.params
    const { password } = req.body
    const salt = bcrypt.genSaltSync()
    const passwordEncrypted = bcrypt.hashSync(password, salt)

    try {
        const restore_password = await Restore_password.findOne({
            where: {
                code
            }
        })
        if (restore_password) {
            const { id_user } = restore_password
            const user = await User.findOne({
                where: { id_user }
            })
            await user.update({
                password: passwordEncrypted
            })

            return res.status(200).json({
                ok: true,
                msg: "Contraseña restablecida correctamente"
            })

        }

        else {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un registro de codigo'
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    createAndSendCode,
    resetPassword
}





