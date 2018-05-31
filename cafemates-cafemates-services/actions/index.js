const db = require('../database')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const datetime = require('node-datetime')
const { errorResponse, successResponse } = require('../responsers')
const createSlug = require('sluger')
const toFixed = require('tofixed');
const moment = require('moment')


exports.retrieveAllCafemates = async(() => {
  try{
    const response = await(db.any(`SELECT cafemates.created_at as created_at,
    username, email, cafemates.location_name,
    cafemates.id,
    cafemates.longitude, avatar_url,
    first_name, last_name, age,
    cafemates.latitude, description
    FROM cafemates, users WHERE cafemates.id = users.id AND status_cafemates='1'`))

    return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveCafematesFilter = async((genderMan, genderWoman, age_first, age_last) => {
  try{
    if( genderMan == true && genderWoman == true ){
      const response = await(db.any(`SELECT cafemates.created_at as created_at,
      username, email, cafemates.location_name,
      cafemates.id,
      cafemates.longitude, avatar_url,
      first_name, last_name, age,
      cafemates.latitude, description
      FROM cafemates, users 
      WHERE cafemates.id = users.id AND status_cafemates='1' AND users.age BETWEEN '${age_first}' AND '${age_last}'`
      ))
      return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
    }else if (genderMan == true && genderWoman == false){
      const response = await(db.any(`SELECT cafemates.created_at as created_at,
      username, email, cafemates.location_name,
      cafemates.id,
      cafemates.longitude, avatar_url,
      first_name, last_name, age,
      cafemates.latitude, description
      FROM cafemates, users 
      WHERE cafemates.id = users.id AND status_cafemates='1' AND users.gender='1' AND users.age BETWEEN '${age_first}' AND '${age_last}'`
      ))
      return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
    }else if (genderMan == false && genderWoman == true){
      const response = await(db.any(`SELECT cafemates.created_at as created_at,
      username, email, cafemates.location_name,
      cafemates.id,
      cafemates.longitude, avatar_url,
      first_name, last_name, age,
      cafemates.latitude, description
      FROM cafemates, users 
      WHERE cafemates.id = users.id AND status_cafemates='1' AND users.gender='0' AND users.age BETWEEN '${age_first}' AND '${age_last}'`
      ))
      return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
    }else{
      const response = await(db.any(`SELECT cafemates.created_at as created_at,
      username, email, cafemates.location_name,
      cafemates.id,
      cafemates.longitude, avatar_url,
      first_name, last_name, age,
      cafemates.latitude, description
      FROM cafemates, users 
      WHERE cafemates.id = users.id AND status_cafemates='1' AND users.age BETWEEN '${age_first}' AND '${age_last}'`
      ))
      return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
    }
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveCafematesByID = async((id) => {
  try{
    const response = await(db.any(`SELECT cafemates.created_at as created_at,
    username, email, cafemates.location_name,
    cafemates.id,
    cafemates.longitude, avatar_url,
    first_name, last_name, age,
    cafemates.latitude, description
    FROM cafemates, users WHERE cafemates.id = users.id AND users.id = '${id}' AND status_cafemates='1'`))

    return successResponse(response, 'Berhasil Mendapatkan data Cafemates', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.endLocation = async(() => {
  try{
    const response = await(db.any(`
      UPDATE cafemates SET status_cafemates='0' WHERE  id='${data.id}' AND status_cafemates='1'
    `))

    return successResponse(response, 'Location history Disable', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveBasecampByID = async((id) => {
  try{
    const basecamp = await(db.any(`SELECT basecamps.created_at as created_at_basecamps,
    username, email, cafemates.location_name,
    basecamps.id,
    basecamps.longitude, avatar_url,
    first_name, last_name, age,
    basecamps.latitude, description
    FROM cafemates, users WHERE cafemates.id = users.id 
    AND basecamp_id='${id}' AND status_basecamp='1' `))

    const groupBasecamp = await(db.any(`
    SELECT basecamp_group_id, age, avatar_url, username, first_name,last_name, basecamp_groups.created_at as created_at_group
    FROM basecamp_groups, users WHERE basecamp_groups.id = users.id AND basecamp_id='${id}' AND status_approved='3'
  `))

    return successResponse(basecamp.map(data => ({...data, join: groupBasecamp.filter(join => join.basecamp_id === data.basecamp_id)})), 'Berhasil Mendaptakan Basecamp', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.postCafemates = async((data) => {
  try{
    const expired = moment().add(15 ,'hours')
    const response = await(db.any(`
      INSERT INTO cafemates(id, location_name, longitude, latitude, description, status_cafemates, type_cafemates, expired, created_at, updated_at)
      VALUES(
        '${data.id}',
        '${data.location_name}',
        '${data.longitude}',
        '${data.latitude}',
        '${data.description}',
        '1',
        '${data.type_cafemates}',
        '${expired}',
        '${datetime.create().format('Y-m-d H:M')}',
        '${datetime.create().format('Y-m-d H:M')}'
      )
    `))
    return successResponse(expired, 'Berhasil Menambahkan Cafemates', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})
exports.deactiveCafemates = async((id) => {
  try{
    const response = await(db.any(`UPDATE cafemates SET status_cafemates='0' WHERE cafemates_id='${id}'`))
    return successResponse(response, 'Berhasil Menonaktif Cafemates', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

//JOIN
exports.joinCafemates = async((data) => {
  try{
    const expired = moment().add(15 ,'hours')
    const response = await(db.any(`
      INSERT INTO cafemates_groups(id, status_approved, master_room_id, type_cafemates, status_group_cafemates,created_at, updated_at)
      VALUES(
        '${data.id}',
        '1',
        '${data.master_room_id}',
        true,
        true,
        '${datetime.create().format('Y-m-d H:M')}',
        '${datetime.create().format('Y-m-d H:M')}'
      )
    `))

    const notification = await(db.any(`
        INSERT INTO notification(id, status_notification, sender_id)
        VALUES(
          '${data.master_room_id}',
          '1',
          '${data.id}'
        )
     `))
    return successResponse(expired, 'Berhasil Join ke Cafemates', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.waitingApproved = async((id) => {
  try{
    const response = await(db.any(`
      SELECT cafemates_groups.id, status_approved, age, avatar_url, username, first_name,last_name, cafemates_groups.created_at as created_at_group
      FROM cafemates_groups, users WHERE cafemates_groups.id = users.id AND master_room_id='${id}'  AND status_approved='1' AND status_group_cafemates='1' LIMIT 10
    `)) 
    return successResponse(response, 'Berhasil Mendapatkan user pendding', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.waitingApprovedByOther = async((id) => {
  try{
    const response = await(db.any(`
    SELECT cafemates_groups.id, status_approved, age, avatar_url, username, first_name,last_name, cafemates_groups.created_at as created_at_group
    FROM cafemates_groups, users WHERE cafemates_groups.id = users.id AND master_room_id='${id}'  AND status_approved='1' AND status_group_cafemates='1' LIMIT 1
    `))
    return successResponse(response, 'Berhasil Mendapatkan user pending ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.confirmUserList = async((id) => {
  try{
    const response = await(db.any(`
    SELECT cafemates_groups.id, status_approved, age, avatar_url, username, first_name,last_name, cafemates_groups.created_at as created_at_group
    FROM cafemates_groups, users WHERE cafemates_groups.id = users.id AND master_room_id='${id}'  AND status_approved='3' AND status_group_cafemates='1' LIMIT 10
    `))
    return successResponse(response, 'Berhasil Mendapatkan user pending ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.removeRequest = async((id) => {
  try{
    const response = await(db.any(`
      UPDATE FROM cafemates_groups SET status_group_cafemates='0' WHERE master_room_id='${id}' AND status_approved='1'
    `))
    return successResponse(response, 'Berhasil Menghapus semua request ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.removeMyRequest = async((id) => {
  try{
    const response = await(db.any(`
      UPDATE FROM cafemates_groups SET status_group_cafemates='0' WHERE id='${id}' AND status_approved='1'
    `))
    return successResponse(response, 'Berhasil Menghapus semua request ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})


exports.acceptJoin = async((data) => {
  try{
    const response = await(db.any(`
      UPDATE cafemates_groups SET status_approved='3' WHERE cafemates_id='${data.cafemates_id}' AND id='${data.id}'
     `))
     const notification = await(db.any(`
        INSERT INTO notification(id, status_notification, sender_id)
        VALUES(
          '${data.id}',
          '3',
          '${data.sender_id}'
        )
     `))
    return successResponse(response, 'Berhasil Menerima request ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.rejectJoin = async((data) => {
  try{
    const response = await(db.any(`
      UPDATE cafemates_groups SET status_approved='2' WHERE cafemates_id='${data.cafemates_id}' AND id='${data.id}' 
    `))

    const notification = await(db.any(`
        INSERT INTO notification(id, status_notification, sender_id)
        VALUES(
          '${data.id}',
          '2',
          '${data.sender_id}'
        )
    `))
    return successResponse(response, 'Berhasil Menolak request ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})


exports.getNotification = async((id) => {
  try{
    const response = await(db.any(`
    SELECT  first_name, last_name, status_notification, notification.id, sender_id FROM notification, users WHERE notification.sender_id = users.id AND notification.id='${id}'
    `))
    return successResponse(response, 'Berhasil Mendapatkan Notification ', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})


