const db = require('../database')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const datetime = require('node-datetime')
const bcrypt = require('bcrypt')
const createSlug = require('sluger')
const toFixed = require('tofixed');
const salt = bcrypt.genSaltSync(10)
const uuidv1 = require('uuid/v1')
const getAge = require("get-age")

const { errorResponse, successResponse } = require('../responsers')


exports.registerUsers = async((data) => {
  try{
    const checkUsername = await(db.any(`SELECT email FROM users WHERE  email='${data.email}'`))
    if(checkUsername.length){
      return errorResponse('Email sudah digunakan', 401)
    }
    else{
      const username = data.first_name+data.last_name+datetime.create().format('HdIS')
      const dateNow = datetime.create().format('Y-m-d') - data.bod;
      const response = await(db.any(`
        INSERT INTO users(first_name, last_name ,username, email, password, status_user, avatar_url, gender, aggrement, bod, age, licence, created_at, updated_at)
        VALUES(
          '${data.first_name}',
          '${data.last_name}',
          '${username}',
          '${data.email}',
          '${bcrypt.hashSync(data.password, salt)}',
          '1',
          '${data.avatar_url}',
          '${data.gender}',
          '${data.aggrement}',
          '${data.bod}',
          '${getAge(data.bod)}',
          '1',
          '${datetime.create().format('Y-m-d')}',
          '${datetime.create().format('Y-m-d')}'
        )
      `))
      return successResponse(response, 'Berhasil Daftar', 200)
    } 
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.updateUser = async((id, data) => {
  try{
    const response = await(db.any(`
      UPDATE users SET
          first_name='${data.first_name}',
          last_name='${data.last_name}',
          jobs='${data.jobs}',
          age='${getAge(data.bod)}',
          bod='${data.bod}',
          bop='${data.bop}',
          instagram_url='${data.instagram_url}',
          facebook_url='${data.facebook_url}',
          avatar_url='${data.avatar_url}',
          gender='${data.gender}',
          company='${data.company}',
          phone='${data.phone}',
          about='${data.about}'
      WHERE id='${id}'
    `))
    return successResponse(response, 'Berhasil Merubah Data user', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveUsersByID = async((id) => {
  try{
    const response = await(db.any(`SELECT id, first_name, last_name,
    jobs, age, bod, bop, instagram_url, facebook_url, avatar_url, province_id,
    region_id, username, email, gender, status_user, created_at, updated_at FROM users WHERE id='${id}' AND status_user='1'`))
    
    return successResponse(response, 'Berhasil Mendapatkan data user', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.updatePassword = async((data, id) => {
  try {
    const responseUser = await(db.query(`SELECT * FROM users WHERE id='${id}' LIMIT 1`))
    const mapPassword = await(responseUser[0].map(pass => pass.password).toString())
    const response = await(bcrypt.compare(data.password_old, mapPassword))
    if(response) {
      const updatePass = bcrypt.hashSync(data.password_new, salt)
      db.query(`UPDATE users SET password='${updatePass}' WHERE id='${id}'`)
      return successResponse(response, 'Kata sandi berhasil diperbaharui', 200)
    }
    else{
      return successResponse(null, 'Kata sandi lama salah', 304)
    }
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

// image
exports.updateAvatar = async((id, data) => {
  try {
      const response = await(db.query(`UPDATE users SET 
      avatar_url='${data.avatar_url}'
      WHERE id=${id}`))
      return successResponse(response, 'Berhasil Merubah Avatar', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.updateCover = async((id, data) => {
  try {
      const response = await(db.query(`UPDATE users SET 
      background_url='${data.cover_url}'
      WHERE id=${id}`))
      return successResponse(response, 'Berhasil Merubah  background', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

//setting 
exports.deActiveUsers = async((id) => {
  try {
      const response = await(db.query(`UPDATE users SET 
      status_user='0'
      WHERE id=${id}`))
      return successResponse(response, 'User Tidak Aktif', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.deleteUsers = async((id) => {
  try {
      const response = await(db.query(`DELETE FROM users
      WHERE id=${id}`))
      return successResponse(response, 'User Tidak Aktif', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.upgradeLicence = async((data) => {
  try {
      const response = await(db.query(`
        UPDATE users SET licence='${data.licence}'
        WHERE id=${data.id}`))
      return successResponse(response, 'Berhasil Upgrade Lisensi', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})
