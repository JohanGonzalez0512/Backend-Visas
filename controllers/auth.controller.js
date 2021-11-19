const { User } = require("../models/index");
const bcrypt = require("bcrypt");
const { createJWT } = require("../helpers/jwt");
const { response } = require("express");
const Restore_passwords = require("../models/restore_password.model");

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const usuario = await User.findOne({ where: { email } });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            });
        }

        const token = await createJWT(usuario.id_user, usuario.username, email);

        res.json({
            ok: true,
            id: usuario.id_user,
            name: usuario.username,
            token
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}



const signup = async (req, res = response) => {
    try {
        const { expiration_date = null, code = null } = req.body
        const { username, email, password } = req.body
        const salt = bcrypt.genSaltSync()
        const passwordEncrypted = bcrypt.hashSync(password, salt)
        const user = new User({ username, password: passwordEncrypted, email })
        await user.save()
        const { id_user } = user;
        const restore_password = await Restore_password.create({ code, expiration_date, id_user })

        res.status(201).json({
            ok: true,
            msg: "Usuario creado correctamente"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const validateToken = async (req, res = response) => {
    const { id_user, username, email } = req;

    const token = await createJWT(id_user, username, email);
    res.json({
        ok: true,
        token,
        id: id_user,
        name: username,
        email
    })
}





module.exports = {
    login,
    signup,
    validateToken
}
