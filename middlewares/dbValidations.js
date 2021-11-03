const { User, ToDo } = require('../models/index')

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
module.exports = {
    checkUserExistence,
    isUsernameDuplicated
};
