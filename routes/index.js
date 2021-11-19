const authRouter = require("./auth.routes");
const tripRouter = require("./trip.routes")
const clientRouter = require("./client.routes")
const expenseRouter  = require("./expenses.routes");
const emailRouter = require("./email.routes");
const incomeRouter = require("./incomes.routes")
module.exports = {
    clientRouter,
    authRouter,
    tripRouter,
    expenseRouter,
    emailRouter,
    incomeRouter
};
