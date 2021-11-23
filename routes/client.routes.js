const { Router } = require("express");
const { check, param } = require("express-validator");
const { getAllClients, 
        getClientsByIdTrip,
        getClientsPassport,   
        createClientPassport, 
        createClientVisa,
        createClientPassportToVisa,
        createClientVisaToPassport,
        updateClientPassport, 
        updateClientVisa,
        deleteClient,
        getClientsByDateTrip } = require("../controllers/client.controller");
const { validateFileds } = require("../helpers/validateFields");
const validateJWT = require("../middlewares/validateJWT");


const clientRouter = Router();


clientRouter.get('/', [
    validateJWT
] , getAllClients);

clientRouter.get('/visa/:id_trip', [
    param('id_trip','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    validateFileds,
    validateJWT
] , getClientsByIdTrip);

clientRouter.get('/visa-fecha/:date', [
    param('date','La fecha del viaje es obligatoria').isDate(),
    validateFileds,
    validateJWT
] , getClientsByDateTrip);

clientRouter.get('/pasaporte', [
    validateJWT
] , getClientsPassport);


clientRouter.post('/pasaporte/:id', [
    param('id','El id del cliente es obligatorio').isInt().exists({checkNull:true}),
    check('id_trip','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    validateFileds,
    validateJWT
], createClientPassportToVisa)

clientRouter.post('/visa/:id', [
    param('id','El id del cliente es obligatorio').isInt().exists({checkNull:true}),
    check('id_certification_type','El id del tipo de certificado es obligatorio').isInt().exists({checkNull:true}),
    check('curp','El CURP es obligatorio y tiene que tener como maximo 18 caracteres').not().isEmpty().isLength({max:18}),
    check('phone_number','El numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    validateFileds,
    validateJWT
], createClientVisaToPassport)

clientRouter.post('/visa', [
    check('id_trip','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    check('name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('last_name','Los apellidos del cliente son obligatorios y deben de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('address','La direccion del cliente es obligatoria y debe de tener como maximo 120 caracteres').not().isEmpty().isLength({max:120}),
    check('birthday','La fecha de nacimiento del cliente es obligatoria').isDate(),
    check('phone_number','El numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    validateFileds,
    validateJWT
], createClientVisa)
clientRouter.post('/pasaporte', [
    check('id_certification_type','El id del tipo de certificado es obligatorio').isInt().exists({checkNull:true}),
    check('name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('last_name','Los apellidos del cliente son obligatorios y deben de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('address','La direccion del cliente es obligatoria y debe de tener como maximo 120 caracteres').not().isEmpty().isLength({max:120}),
    check('birthday','La fecha de nacimiento del cliente es obligatoria').isDate(),
    check('curp','El CURP es obligatorio y tiene que tener como maximo 18 caracteres').not().isEmpty().isLength({max:18}),
    check('phone_number','El numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    validateFileds,
    validateJWT
], createClientPassport)

clientRouter.put('/visa/:id', [
    param('id','El id del cliente es obligatorio').isInt().exists({checkNull:true}),
    check('name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('last_name','Los apellidos del cliente son obligatorios y deben de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('address','La direccion del cliente es obligatoria y debe de tener como maximo 120 caracteres').not().isEmpty().isLength({max:120}),
    check('birthday','La fecha de nacimiento del cliente es obligatoria').isDate(),
    check('last_name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('phone_number','El numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    check('sheet_visa_payment','La hoja de pago para la visa es obligatoria').isBoolean().notEmpty(),
    check('copy_passport','La copia del pasaporte es obligatoria').isBoolean().notEmpty(),
    check('right_visa','El derecho a visa es obligatorio').isBoolean().notEmpty(),
    check('picture_visa','El fotos para la visa son obligatorias').isBoolean().notEmpty(),
    check('accepted','El estatus de la visa es obligatorio').isBoolean().notEmpty(),
    //check('date_expiration','la fecha de expiracion es obligatoria').isDate(),
    validateFileds,
    validateJWT
], updateClientVisa)

clientRouter.put('/pasaporte/:id', [
    param('id','El id del cliente es obligatorio').isInt().exists({checkNull:true}),
    check('id_certification_type','El tipo de certificacion es obligatorio'),
    check('name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('last_name','Los apellidos del cliente son obligatorios y deben de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('address','La direccion del cliente es obligatoria y debe de tener como maximo 120 caracteres').not().isEmpty().isLength({max:120}),
    check('birthday','La fecha de nacimiento del cliente es obligatoria').isDate(),
    check('last_name','El nombre del cliente es obligatorio y debe de tener como maximo 50 caracteres').not().isEmpty().isLength({max:50}),
    check('phone_number','El numero de telefono es obligatorio y tienen que ser 10 digitos').not().isEmpty().isLength({max:10}),
    check('curp','El CURP es obligatorio y tiene que tener como maximo 18 caracteres').not().isEmpty().isLength({max:18}),
    check('expired_passport','El estatus del pasaporte es obligatorio').isBoolean().notEmpty(),

    //check('date_expiration','la fecha de expiracion es obligatoria').isDate(),
    validateFileds,
    validateJWT
], updateClientPassport)

clientRouter.delete('/:id', [
    param('id','El id del cliente es obligatorio').isInt().exists({checkNull:true}),
    
    validateFileds,
    validateJWT
], deleteClient)


module.exports = clientRouter;
