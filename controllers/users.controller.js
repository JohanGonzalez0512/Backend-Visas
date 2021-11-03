const User = require("../models/user.model.js");



const getUsers = async (req, res) => {

    const usuarios = await User.findAll();

    res.json({ usuarios });

}
const getUserById = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findByPk(id);


    if (usuario) {
        res.json({ usuario })
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con el id ${id}`
        });
    }

}


const putUser = async (req, res) => {

    const { id } = req.params
    const { body } = req;
    try {
        const usuario = await User.findByPk( id )
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id'+ id
            });
        }

        await usuario.update( body );

        res.json( usuario );



    } catch (error) {
        
    }
    res.json({
        msg: 'putUsuario',
        body,
        id
    })

}
const deleteUser = async (req, res) => {

    const { id } = req.params;

    const usuario = await User.findByPk( id )
        if (!usuario) {
            return res.status(404).json({
                msg: 'No existe un usuario con el id'+ id
            });
        }

    await usuario.destroy();



    res.json(usuario)

}








module.exports = {
    getUsers,
    getUserById,
    putUser,
    deleteUser,


}