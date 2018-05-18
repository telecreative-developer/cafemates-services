const db = require('../database')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const datetime = require('node-datetime')
const createSlug = require('sluger')
const toFixed = require('tofixed');
const uuidv1 = require('uuid/v1');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const { errorResponse, successResponse } = require('../responsers')




exports.retrieveCrud = async(() => {
  try{
    const response = await(db.any(`
      SELECT * FROM users
    `))
    return successResponse(response, 'Berhasil Mendapatkan data chatting', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveById = async((id) => {
  try{
    const response = await(db.any(`
      SELECT * FROM users where id = '${id}'
    `))
    return successResponse(response, 'Berhasil Mendapatkan data chatting', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.deleteCrud = async((id) => {
  try{
    const response = await(db.any(`
      DELETE FROM users where id = '${id}'
    `))
    return successResponse(response, 'Berhasil delete', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.updateCrud = async((id, data) => {
  try{
    const response = await(db.any(`
    UPDATE users SET
        first_name='${data.first_name}',
        last_name='${data.last_name}'
    WHERE id='${id}'
    `))
    return successResponse(response, 'Berhasil update', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.postCrud = async((data) => {
  try{
      const response = await(db.any(`
        INSERT INTO users(first_name, last_name, password)
        VALUES(
          '${data.first_name}',
          '${data.last_name}',
          '${bcrypt.hashSync(data.password, salt)}'
        )
      `))
      console.log(response)
      return successResponse(response, 'Berhasil Mengirimkan data', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})