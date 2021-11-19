const { User, ToDo } = require('../models/index');
const Restore_password = require('../models/restore_password.model');
const moment = require('moment');
const checkUserExistence = async( req, res, next) => {
    const { user_id } = req.params

    try {
        const user = await User.findByPk(user_id);
        if(!user){
            return res.status(404).json({
                ok : false,
                msg : `User with id ${user_id} doesn't exist`
            });
        }
        next();
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg : `Talk with the administrator`
        });
    }
}


const isUsernameDuplicated = async( req, res, next) => {
    const { username } = req.body

    try {
        const user = await User.findOne({ where : {username}});
        if(user){
            return res.status(404).json({
                ok : false,
                msg : `An user with username ${username} already exists`
            });
        }
        next();
    } catch ( err ) {
        console.log(err);
        res.status(500).json({
            ok : false,
            msg : `Talk with the administrator`
        });
    }
}


const checkCode = async (req, res, next)=> {
    const { code } = req.params
    const date = moment().format("YYYY-MM-DD hh:mm:ss")
    try {
        
        const restore_password = await Restore_password.findOne({
            where:{code}
        })
        if (restore_password) {
    
            const {expiration_date} = restore_password;
            console.log(expiration_date)
            if (moment(date).isSameOrBefore(expiration_date)) {
               
                next();
            }
            else{
                return res.status(400).json({
                    ok: false,
                    msg: 'El codigo ya esta vencido, vuelve a generar un codigo'
                });
            }
        
        }
        else{
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun codigo en la base de datos'
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
module.exports = {
    checkUserExistence,
    isUsernameDuplicated,
    checkCode
};
