const authRouter = require("./auth.routes");
const tripRouter = require("./trip.routes")
const clientRouter = require("./client.routes")
const expenseRouter  = require("./expenses.routes")
module.exports = {
    clientRouter,
    authRouter,
    tripRouter,
    expenseRouter
};
