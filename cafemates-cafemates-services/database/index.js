const express = require("express")
const app = express()
require('dotenv').config({path:__dirname+'/./../../.env'})
const promise = require("bluebird")
const options = {
  promiseLib: promise
}

const pgp = require("pg-promise")(options)


const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
}

const db = pgp(config);

module.exports = db