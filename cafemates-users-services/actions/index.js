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
const passwordHash = require('password-hash-node')

const { errorResponse, successResponse } = require('../responsers')


exports.registerUsers = async((data) => {
  try{
    const checkUsername = await(db.any(`SELECT email FROM users WHERE  email='${data.email}'`))
    if(checkUsername.length){
      return errorResponse('Email sudah digunakan', 401)
    }
    else{
      const username = data.first_name+datetime.create().format('HdIS')
      const dateNow = datetime.create().format('Y-m-d') - data.bod;
      const passwordTrue = await(passwordHash.create(data.password, "SSHA"))
      console.log(passwordTrue)
      const response = await(db.any(`
        INSERT INTO users(first_name, last_name ,username, email, password, status_user, avatar_url, gender, aggrement, bod, age, licence, created_at, updated_at)
        VALUES(
          '${data.first_name}',
          '${data.last_name}',
          '${username}',
          '${data.email}',
          '${passwordTrue}',
          '1',
          '${data.avatar_url}',
          '${data.gender}',
          '1',
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
    const passwordTrue = await(passwordHash.create(data.password, "SSHA"))
    
    if(data.password === null || data.password === ""){
      const response = await(db.any(`
        UPDATE users SET
            first_name='${data.first_name}',
            last_name='${data.last_name}',
            username='${data.username}',
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
            about='${data.about}',
            email='${data.email}',
            background_url='${data.background_url}'
        WHERE id='${id}'
      `))
      console.log('no password')
      return successResponse(response, 'Berhasil Merubah Data user', 200)
    }
    else{
      const response = await(db.any(`
        UPDATE users SET
            first_name='${data.first_name}',
            last_name='${data.last_name}',
            username='${data.username}',
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
            about='${data.about}',
            email='${data.email}',
            background_url='${data.background_url}',
            password='${passwordTrue}'
        WHERE id='${id}'
      `))
      console.log('password')
      return successResponse(response, 'Berhasil Merubah Data user', 200)
    }
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveUsers = async(() => {
  try{
    const response = await(db.any(`SELECT * FROM users WHERE status_user='1'`))
    
    return successResponse(response, 'Berhasil Mendapatkan data user', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveUsersByID = async((id) => {
  try{
    const response = await(db.any(`SELECT * FROM users WHERE id='${id}' AND status_user='1'`))
    
    return successResponse(response, 'Berhasil Mendapatkan data user', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveUsersByEmail = async((email) => {
  try{
    const response = await(db.any(`SELECT * FROM users WHERE email='${email}' AND status_user='1'`))
    
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

