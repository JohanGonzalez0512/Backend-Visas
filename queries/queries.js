const queries = {
    getExpensesByMonth:"select description ,amount, date from expenses where month(date) = :month",
    getTotalExpensesByMonth:"select sum(amount) as total from expenses where month(date) = :month",
    getTotalExpensesByDate:"select sum(amount) as total from expenses where date = :date",
    getTotalExpenses:"select sum(amount) as total from expenses "

}

module.exports = queries;