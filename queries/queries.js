const queries = {
    getExpensesByMonth: "select description ,amount, date from expenses where month(date) = :month and year(date) = :year",
    getTotalExpensesByMonth: "select sum(amount) as total from expenses where month(date) = :month and year(date) = :year",
    getTotalExpensesByDate: "select sum(amount) as total from expenses where date = :date",
    getTotalExpenses: "select sum(amount) as total from expenses ",
    getIncomesByMonth: "select concat(c.name,' ',c.last_name) as Name, i.description ,i.amount, i.date from incomes i left join clients c on i.id_client = c.id_client where month(i.date) = :month and year(i.date) = :year",
    getIncomesByDate: "select concat(c.name,' ',c.last_name) as Name, i.description ,i.amount, i.date from incomes i left join clients c on i.id_client = c.id_client where i.date = :date ",
    getTotalIncomesByMonth: "select sum(amount) as total from incomes where month(date) = :month and year(date) = :year",
    getTotalIncomesByDate: "select sum(amount) as total from incomes where date = :date",
    getTotalIncomes: "select sum(amount) as total from incomes",
    getTripsByDate: 'SELECT `id_trip`, `limit_people`, `date` FROM `trips` AS `trips` WHERE `trips`.`date` = :date and `trips`. `active` = 1;'
}

module.exports = queries;