const { Datastore } = require('nedb-async-await')
const { join } = require('path')

const db = new Datastore({
  filename: join(__dirname, '.', 'database.db'),
  autoload: true
})

const addUser = async (db, user) => {
  try {
    await db.insert(user)
  } catch (err) {
    console.error('addUser Failed:', err)
  }
}

const setName = async (db, id, name) => {
  try {
    await db.update({ id }, {
      $set: {
        name: name
      }
    }, { upsert: true })
  } catch (err) {
    console.error('setName Failed:', err)
  }
}

const addMessage = async (db, id, msg) => {
  try {
    await db.update({ id }, {
      $push: {
        messages: {
          msg,
          timestamp: Date.now()
        }
      }
    }, { upsert: true })
  } catch (err) {
    console.error('addMessage Failed:', err)
  }
}

const getMessages = async db => {
  try {
    const users = await db.find({})
    const messages = []
    users.forEach(user => {
      user.messages.forEach(message => {
        const name = (user.name !== undefined && user.name.length > 0)
          ? user.name
          : user.id
        messages.push({
          name,
          ...message
        })
      })
    })
    messages.sort((a, b) => a.timestamp - b.timestamp)
    return messages
  } catch (err) {
    console.error('getMessages Failed:', err)
  }
}

const pushCharacter = async (db, id, char, dest) => {
  let $push
  if (dest === 'msg') {
    $push = {
      messageQueue: char
    }
  } else if (dest === 'name') {
    $push = {
      nameQueue: char
    }
  } else {
    throw new Error('\'dest\' for character not one of [\'msg\', \'name\']')
  }

  if (char === 'done') {
    await concatQueue(db, id, dest)
  } else {
    try {
      await db.update({ id }, { $push }, { upsert: true })
    } catch (err) {
      console.error('pushCharacter Failed:', err)
    }
  }
}

const concatQueue = async (db, id, queueType) => {
  let queue

  try {
    const user = await db.findOne({ id })
    if (queueType === 'msg') {
      queue = user.messageQueue
    } else if (queueType === 'name') {
      queue = user.nameQueue
    } else {
      throw new Error('\'queueType\' for concat not one of [\'msg\', \'name\']')
    }
  } catch (err) {
    console.error('concatQueue Failed:', err)
  }

  if (queue.length > 0) {

    const concat = queue.slice(queue.lastIndexOf('begin') + 1).join('')

    try {
      if (queueType === 'msg') {
        await addMessage(db, id, concat)
        await db.update({ id }, { $set: { messageQueue: [] } }, { upsert: true })
      } else if (queueType === 'name') {
        await setName(db, id, concat)
        await db.update({ id }, { $set: { nameQueue: [] } }, { upsert: true })
      } else {
        throw new Error('\'queueType\' for concat not one of [\'msg\', \'name\']')
      }
    } catch (err) {
      console.error('concatQueue Failed:', err)
    }
  }
}

module.exports = {
  db,
  addUser,
  setName,
  addMessage,
  getMessages,
  pushCharacter,
  concatQueue
}
