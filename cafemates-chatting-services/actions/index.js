const db = require('../database')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const datetime = require('node-datetime')
const createSlug = require('sluger')
const toFixed = require('tofixed');
const uuidv1 = require('uuid/v1');
const { errorResponse, successResponse } = require('../responsers')




exports.retrieveChattingById = async((id, sender_id) => {
  try{
    const response = await(db.any(`
      SELECT first_name, last_name, avatar_url, age, content, sender_id, code_id, chatting.created_at as created_at_chatting
      FROM users, chatting WHERE chatting.id = users.id AND chatting.id='${id}' and sender_id='${sender_id}'
    `))
    return successResponse(response, 'Berhasil Mendapatkan data chatting', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.deleteChatting = async((code_id) => {
  try{
    const response = await(db.any(`
      DELETE FROM chatting WHERE code_id='${code_id}'
    `))
    return successResponse(response, 'Berhasil Menghapus data chatting', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.retrieveChatting = async((id) => {
  try{
    const response = await(db.any(`SELECT DISTINCT ON(sender_id) sender_id, chatting.id, content, chatting.created_at, chatting_id, first_name, last_name, avatar_url, age FROM chatting, users WHERE chatting.id= users.id AND chatting.id='${id}'`))

    return successResponse(response, 'Berhasil Mendapatkan data chatting', 200)
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})

exports.postChatting = async((data) => {
  try{
    const check_chatting = await(db.any(`SELECT code_id FROM chatting WHERE chatting.id='${data.id}' AND sender_id='${data.sender_id}'`))
    if(check_chatting.length){
      const response = await(db.any(`
        INSERT INTO chatting(content, sender_id, id, code_id, updated_at, created_at)
        VALUES(
          '${data.content}',
          '${data.sender_id}',
          '${data.id}',
          '${check_chatting[0].code_id}',
          '${datetime.create().format('Y-m-d H:M')}',
          '${datetime.create().format('Y-m-d H:M')}'
        )
      `))
    return successResponse(response, 'Berhasil Mengirimkan Chatting', 200)
    } else{
      const response = await(db.any(`
        INSERT INTO chatting(content, sender_id, id, code_id, updated_at, created_at)
        VALUES(
          '${data.content}',
          '${data.sender_id}',
          '${data.id}',
          '${uuidv1()}',
          '${datetime.create().format('Y-m-d H:M')}',
          '${datetime.create().format('Y-m-d H:M')}'
        )
      `))
      console.log(response)
      return successResponse(response, 'Berhasil Mengirimkan Chatting', 200)
    }
    
  }catch(e) {
    console.log(e)
    return errorResponse(e, 500)
  }
})
