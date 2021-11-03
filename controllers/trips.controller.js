const Trip = require("../models/trip.model");



const getAllTrips = async (req, res) => {
    try {
        const { date, active = 1 } = req.params;
        if(date){
            const trips = await Trip.findAll({
                where: { active, date }
            });
    
            res.status(200).json({
                ok: true,
                trips
            })
        }
        else{
            const trips = await Trip.findAll({
                where: { active }
            });
    
            res.status(200).json({
                ok: true,
                trips
            })
        }
         

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
    }

}
const createTrip = async (req, res) => {

    const { limit_people, date  } = req.body;

    let trip = await Trip.findOne({
        where: { date, limit_people }
    });

    if (trip) {

        if (trip.active === 1) {
            return res.status(400).json({
                ok: false,
                msg: "Un viaje con esos campos ya esta creado."
            })
        }
        else {

            try {
                await trip.update({ date, limit_people, active: 1 })
                return res.status(201).json({
                    ok: true,
                    msg: "Viaje creado correctamente",
                })
            } catch (error) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Hable con el administrador'
                })
            }
        }

    }
    else {
        trip = await Trip.create({ limit_people, date })
        return res.status(201).json({
            ok: true,
            msg: "Viaje creado correctamente",
        })
    }

}


const updateTrip = async (req, res) => {

    const { id } = req.params;
    const { body } = req;
    try {
        const trip = await Trip.findByPk(id)
        if (!trip) {
            return res.status(404).json({
                msg: 'No existe un viaje con el id' + id
            });
        }

        await trip.update(body);

        return res.status(200).json({
            ok: true,
            msg: "Viaje actualizado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    

}
const deleteTrip = async (req, res) => {

    const { id } = req.params;
    try {
        
        const trip = await Trip.findByPk(id);
    
        if (!trip) {
            return res.status(404).json({
                msg: 'No existe un viaje con el id' + id
            });
        };
    
        await trip.update( { active: 0} );
        res.status(200).json({
            ok: true,
            msg: "El viaje se elimino correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {

    getAllTrips,
    createTrip,
    updateTrip,
    deleteTrip


}




