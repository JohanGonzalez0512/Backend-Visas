const { Op } = require("sequelize");
const { Client,
    Certification_type,
    Passport_info,
    Visa_info,
    Trip_client,
    Trip } = require("../models/index");
const { nameFixed } = require("../helpers/regexp-name")

const getAllClients = async (req, res) => {
    try {
        let { name } = req.query

        let clients
        if (name) {
            try {

                const name2 = nameFixed(name)
                clients = await Client.findAll({

                    where: {
                        active: 1,
                        name: { [Op.regexp]: `^[${name2}]` }
                    }

                })
            } catch (q) {
                console.log(q)
            }

            res.status(200).json({
                ok: true,
                clients,
            })
        }
        else {

            clients = await Client.findAll({
                where: { active: 1 }
            })
            res.status(200).json({
                ok: true,
                clients

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
const getClientsByIdTrip = async (req, res) => {
    try {

        const { id_trip } = req.params
        let { name } = req.query
        const trip = await Trip.findByPk(id_trip)
        if (!trip) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un viaje con ese id'
            })
        }
        else {

            const trip_client = await Trip_client.findAll({
                where: { id_trip }
            })

            const id_clients = trip_client.map(petition => {
                const { id_client } = petition
                return [
                    id_client
                ]

            });

            let clients
            if (name) {
                const name2 = nameFixed(name)
                clients = await Promise.all(id_clients.map(async (id_client) => {
                    //console.log(id_client);
                    let visa_info
                    const client = await Client.findOne({
                        where: {
                            id_client,
                            active: 1,
                            name: { [Op.regexp]: `^[${name2}]` }
                        }
                    })
                    if (client) {

                        visa_info = await Visa_info.findOne({
                            where: { id_client }
                        })
                        return {
                            client,
                            visa_info
                        }
                    }
                    // console.log(client),
                    // console.log(visa_info)

                }))

                clients = clients.filter(client => client != null)

                return res.status(201).json({
                    ok: true,
                    clients
                })

            } else {
                try {

                    clients = await Promise.all(id_clients.map(async (id_client) => {
                        //console.log(id_client);
                        let visa_info
                        const client = await Client.findOne({
                            where: { id_client, active: 1 }
                        })
                        if (client) {

                            visa_info = await Visa_info.findOne({
                                where: { id_client }
                            })
                            return {
                                client,
                                visa_info
                            }
                        }
                        // console.log(client),
                        // console.log(visa_info)

                    }))

                    clients = clients.filter(client => client != null)

                    return res.status(201).json({
                        ok: true,
                        clients
                    })
                } catch (error) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Hable con el administrador'
                    })
                }

            }



        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const createClientVisa = async (req, res) => {

    const { name, last_name, address, birthday, phone_number, id_trip } = req.body;
    const { date_expiration = null } = req.body;
    let client

    try {
        const trip = await Trip.findOne({
            where: { id_trip }
        })
        if (!trip) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un viaje con ese id."
            })
        }
        client = await Client.findOne({
            where: { name, last_name, active: 1 }
        })
        if (client) {
            if (client.active === 1) {
                return res.status(400).json({
                    ok: false,
                    msg: "Un cliente con esos campos ya esta creado."
                })
            }
            else {
                try {
                    await client.update({ name, last_name, address, birthday, phone_number, active: 1 })
                    return res.status(201).json({
                        ok: true,
                        msg: "Cliente creado correctamente",
                    })
                } catch (error) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Hable con el administrador'
                    })
                }
            }

        } else {

            client = await Client.create({ name, last_name, address, birthday, phone_number })
            const { id_client } = client;
            const trip_client = await Trip_client.create({ id_client, id_trip })
            const visa_info = await Visa_info.create({ id_client, date_expiration })
            console.log(id_client)
            return res.status(201).json({
                ok: true,
                msg: "Cliente creado correctamente",
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
const getClientsPassport = async (req, res) => {
    let { name } = req.query
    let clients

    const passport_info = await Passport_info.findAll();

    const id_clients = passport_info.map(petition => {
        const { id_client } = petition;
        return [
            id_client
        ]
    });
    if (name) {

        const name2 = nameFixed(name)
        clients = await Promise.all(id_clients.map(async (id_client) => {
            //console.log(id_client);
            let passport_info
            const client = await Client.findOne({
                where: {
                    id_client,
                    active: 1,
                    name: { [Op.regexp]: `^[${name2}]` }
                }
            })
            if (client) {

                passport_info = await Passport_info.findOne({
                    where: { id_client }
                })
                return {
                    client,
                    passport_info
                }
            }
            // console.log(client),
            // console.log(visa_info)

        }))

        clients = clients.filter(client => client != null)

        return res.status(201).json({
            ok: true,
            clients
        })

    } else {



        clients = await Promise.all(id_clients.map(async (id_client) => {
            //console.log(id_client);
            let passport_info
            const client = await Client.findOne({
                where: { id_client, active: 1 }
            })
            if (client) {

                passport_info = await Passport_info.findOne({
                    where: { id_client }
                })
                return {
                    client,
                    passport_info
                }
            }


        }))

        clients = clients.filter(client => client != null)

        return res.status(201).json({
            ok: true,
            clients
        })



    }




}

const createClientPassport = async (req, res) => {
    const { name, last_name, address, birthday, phone_number } = req.body;
    const { id_certification_type, date_expiration = null, curp } = req.body;

    try {
        let client = await Client.findOne({
            where: { name, last_name }
        })
        if (client) {
            if (client.active === 1) {
                return res.status(400).json({
                    ok: false,
                    msg: "Un cliente con esos campos ya esta creado."
                })
            } else {
                try {
                    await client.update({ name, last_name, address, birthday, phone_number, active: 1 })
                    return res.status(201).json({
                        ok: true,
                        msg: "Cliente creado correctamente",
                    })

                } catch (error) {
                    return res.status(500).json({
                        ok: false,
                        msg: 'Hable con el administrador'
                    })
                }

            }
        } else {

            client = await Client.create({ name, last_name, address, birthday, phone_number })
            const { id_client } = client;
            const passport_info = await Passport_info.create(
                {
                    id_certification_type,
                    id_client,
                    date_expiration,
                    curp
                })

            return res.status(201).json({
                ok: true,
                msg: "Cliente creado correctamente",
            })

        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const updateClientPassport = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, address, birthday, phone_number } = req.body;
    const { curp, date_expiration=null, id_certification_type, expired_passport } = req.body;
    try {
        const client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id' + id
            });
        }
        await client.update({ name, last_name, address, birthday, phone_number });
        const passport_info = await Passport_info.findOne({
            where: { id_client }
        })
        if (!passport_info) {
            return res.status(404).json({
                msg: 'No existe un registro de visa con el id' + id
            });
        }
        await passport_info.update({
            curp,
            id_certification_type,
            date_expiration,
            expired_passport
        });

        return res.status(200).json({
            ok: true,
            msg: "Cliente actualizado correctamente"
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }


}


const updateClientVisa = async (req, res) => {
    const { id } = req.params;
    const { name, last_name, address, birthday, phone_number } = req.body;
    const { sheet_visa_payment, copy_passport, right_visa, picture_visa, accepted, date_expiration=null, } = req.body;
    try {
        const client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id' + id
            });
        }

        await client.update({ name, last_name, address, birthday, phone_number });
        const visa_info = await Visa_info.findOne({
            where: { id_client }
        })
        if (!visa_info) {
            return res.status(404).json({
                msg: 'No existe un registro de visa con el id' + id
            });
        }
        await visa_info.update({
            sheet_visa_payment,
            copy_passport,
            right_visa,
            picture_visa,
            accepted,
            date_expiration
        });


        return res.status(200).json({
            ok: true,
            msg: "Cliente actualizado correctamente"
        })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
const deleteClient = async (req, res) => {

    const { id } = req.params;
    try {
        let client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id' + id
            });
        }
        else {
            await client.update({ active: 0 })
            const { id_client } = client
            let visa_info = await Visa_info.findOne({
                where: { id_client }
            })
            let passport_info = await Passport_info.findOne({
                where: { id_client }
            })
            if (visa_info) {

                await visa_info.update(
                    {
                        sheet_visa_payment: 0,
                        copy_passport: 0,
                        right_visa: 0,
                        picture_visa: 0,
                        accepted: 0,
                        date_expiration: null,
                    });
                

            }
            if (passport_info) {
                await passport_info.update({
                    date_expiration: null,
                    expired_passport: 0
                })
            }

        }

        return res.status(200).json({
            ok: true,
            msg: "El cliente se elimino correctamente"
        })
       


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const createClientVisaToPassport = async (req, res) => {
    const { id } = req.params;
    const { id_certification_type, date_expiration = null, curp } = req.body;

    try {
        let client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id' + id
            });
        }
        else {

            const { id_client } = client;
            let passport_info = await Passport_info.findOne({
                where:{id_client}
            })
            if (passport_info) {
                return res.status(404).json({
                    msg: 'ya existe un cliente en un pasaporte con el id' + id
                });
            }
            passport_info = await Passport_info.create(
                {
                    id_certification_type,
                    id_client,
                    date_expiration,
                    curp
                })

            return res.status(201).json({
                ok: true,
                msg: "Cliente creado correctamente",
            })
        }

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const createClientPassportToVisa = async (req, res) => {
    const { id } = req.params;
    const { id_trip } = req.body;
    const { date_expiration = null } = req.body;
    try {

        const trip = await Trip.findByPk(id_trip)
        if (!trip) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un viaje con ese id'
            })
        }
        let client = await Client.findByPk(id)
        if (!client) {
            return res.status(404).json({
                msg: 'No existe un cliente con el id' + id
            });
        }
        else {
            const { id_client } = client;

            let trip_client = await Trip_client.findOne({ where:{
                id_client
            } })
            if (trip_client) {
                return res.status(404).json({
                    msg: 'ya existe un cliente en un viaje con el id' + id
                });
            }
            trip_client = await Trip_client.create({ id_client, id_trip })
            let visa_info = await Visa_info.findOne({ where:{id_client} })
            if (visa_info) {
                return res.status(404).json({
                    msg: 'ya existe un cliente en un viaje con el id' + id
                });
            }
            visa_info = await Visa_info.create({ id_client, date_expiration })
            return res.status(201).json({
                ok: true,
                msg: "Cliente creado correctamente",
            })


        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}
//TODO: TESTEAR ENDPOINTS: CREATE CLIENTSPASSPORT Y GETCLIENTSPASSPORT AND DELETE AND createClientPassportToVisa, 
module.exports = {
    getAllClients,
    getClientsByIdTrip,
    getClientsPassport,
    createClientPassport,
    createClientVisa,
    createClientPassportToVisa,
    createClientVisaToPassport,
    updateClientVisa,
    updateClientPassport,
    deleteClient


}




