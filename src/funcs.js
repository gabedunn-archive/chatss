const { db, addUser, getMessages } = require('./db')

const responseTime = async (ctx, next) => {
  const t1 = Date.now()
  await next()
  const t2 = Date.now()
  ctx.set('X-Response-Time', Math.ceil(t2 - t1) + 'ms')
}

// const home = async ctx => {
//   ctx.status = 200
//   ctx.body = 'henlo fren'
// }

const home = async ctx => {
  ctx.render('index')
}

const about = async ctx => {
  ctx.render('about')
}

const name = async ctx => {
  ctx.render('name')
}

const chat = async ctx => {
  ctx.render('chat')
}

const chatbox = async ctx => {
  const messages = await getMessages(db)
  ctx.render('chatbox', {
    messages
  })
}

const setID = async (ctx, next) => {
  const id = ctx.cookies.get('user-id')
  if (id === undefined) {
    const r = Math.random().toString(36).substring(7)
    ctx.cookies.set('user-id', `user-${r}`)
    await addUser(db, {
      id: `user-${r}`,
      name: '',
      messages: [],
      messageQueue: [],
      nameQueue: []
    })
    console.log(`created user: user-${r}`)
  }
  await next()
}

module.exports = {
  responseTime,
  setID,
  home,
  about,
  name,
  chat,
  chatbox
}
