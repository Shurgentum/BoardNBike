const { Sequelize } = require("sequelize")


exports.pg = new Sequelize("postgres://tester:postgres@localhost:5432/develop", {
    dialect: "postgres"
})
