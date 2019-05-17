const { db, pushCharacter } = require('./db')

const msgAPI = async ctx => {
  const q = ctx.query
  const id = ctx.cookies.get('user-id')
  ctx.status = 200
  ctx.set('Cache-Control', 'must-revalidate,no-cache,no-store')
  ctx.body = q
  if (q.status === 'begin') {
    console.log('-----Begin Message-----')
    await pushCharacter(db, id, 'begin', 'msg')
  } else if (q.status === 'done') {
    ctx.redirect('/chat')
    console.log('-----End Message-----')
    await pushCharacter(db, id, 'done', 'msg')
  } else {
    console.log(q.char)
    await pushCharacter(db, id, q.char, 'msg')
  }
}

const nameAPI = async ctx => {
  const q = ctx.query
  const id = ctx.cookies.get('user-id')
  ctx.status = 200
  ctx.set('Cache-Control', 'must-revalidate,no-cache,no-store')
  ctx.body = q
  if (q.status === 'begin') {
    console.log('-----Begin Name-----')
    await pushCharacter(db, id, 'begin', 'name')
  } else if (q.status === 'done') {
    ctx.redirect('/')
    console.log('-----End Name-----')
    await pushCharacter(db, id, 'done', 'name')
  } else {
    console.log(q.char)
    await pushCharacter(db, id, q.char, 'name')
  }
}

module.exports = {
  msgAPI,
  nameAPI
}
