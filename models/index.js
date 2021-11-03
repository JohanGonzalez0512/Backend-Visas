const Expense = require('./expense.model')
const User = require("./user.model");
const Client = require("./client.model");
const Certification_type = require("./certification_type.model");
const Income = require("./income.model");
const Trip = require("./trip.model");
const Trip_client = require("./trip_client.model");
const Passport_info = require("./passport_info.model");
const Visa_info = require("./visa_info.model");



module.exports = {
    User,
    Expense,
    Client,
    Certification_type,
    Income,
    Trip,
    Trip_client,
    Passport_info,
    Visa_info
};
