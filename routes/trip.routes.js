const { Router } = require("express");
const { check, param } = require("express-validator");
const { createTrip,getAllTrips,deleteTrip,updateTrip } = require("../controllers/trips.controller");
const { validateFileds } = require("../helpers/validateFields");
const validateJWT = require("../middlewares/validateJWT");


const tripRouter = Router();


tripRouter.get('/', [
    validateJWT
] , getAllTrips);

tripRouter.post('/', [
    check('date', "La fecha del viaje es obligatoria").isDate(),
    check('limit_people',"El limite de personas es obligatorio").isInt().exists({checkNull:true}),
    validateFileds,
    validateJWT
], createTrip)

tripRouter.put('/:id', [
    param('id','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    check('date', "La fecha del viaje es obligatoria").isDate(),
    check('limit_people',"El limite de personas es obligatorio").isInt().exists({checkNull:true}),
    validateFileds,
    validateJWT
], updateTrip)

tripRouter.delete('/:id', [
    param('id','El id del viaje es obligatorio').isInt().exists({checkNull:true}),
    
    validateFileds,
    validateJWT
], deleteTrip)


module.exports = tripRouter;
