const express = require('express')
const cors = require('cors');
const { authRouter, 
        clientRouter, 
        tripRouter, 
        expenseRouter} = require('../routes/index')
const fileUpload = require('express-fileupload')
const { db } = require('../db/connection');

class Server {

    apiPaths = {};

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPaths = {
            users: '/api/usuarios',
            auth : '/api/auth',
            clients: '/api/clientes',
            trips: '/api/viajes',
            expenses: '/api/gastos'

        }
        this.dbConnection();
        // Middlewares
        this.middlewares();
        // Rutas de mi aplicacion 

        this.routes();
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            throw new Error (error);
        }
    }


    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y parseo del body
        this.app.use(express.json());

        //FileUpload
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        this.app.use( express.static('public'));
    }


    routes() {
        
        this.app.use(this.apiPaths.auth,        authRouter)
        this.app.use(this.apiPaths.trips,       tripRouter)
        this.app.use(this.apiPaths.clients,     clientRouter)
        this.app.use(this.apiPaths.expenses,    expenseRouter)
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        })
    }



}

module.exports = Server



