const { db, getMessages, pushCharacter, concatQueue } = require('./db')

const main = async (db) => {
  try {
    const messages = await getMessages(db)
    console.log(messages)
  } catch (err) {
    console.log('main Failed:', err)
  }
}

main(db)
