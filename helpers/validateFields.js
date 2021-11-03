const {validationResult} = require('express-validator')

const validateFileds = (req,res,next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok : false,
            msg : "Hubo un error en la peticion, verificala por favor",
            errors : errors.mapped()
        })
    }
    next()
}

module.exports = {
    validateFileds
};
