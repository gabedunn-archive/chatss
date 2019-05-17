const Koa = require('koa')
const Router = require('koa-router')
const koaPug = require('koa-pug')
const koaJson = require('koa-json')
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const { cyan } = require('chalk')
const { config } = require('dotenv')
const { resolve, join } = require('path')

const { responseTime, home, about, name, chat, chatbox, setID } = require('./funcs')
const { msgAPI, nameAPI } = require('./api')

config({ path: resolve(process.cwd(), '.env') })

const app = new Koa()
const r = new Router()

new koaPug({
  viewPath: join(__dirname, 'views'),
  debug: true,
  pretty: true,
  basedir: join(__dirname, 'views'),
  app: app
})

app.use(koaJson())
app.use(koaStatic(join(__dirname, 'static')))
app.use(responseTime)
app.use(setID)
app.use(bodyParser())

// r.all('/', home)
r.get('/', home)
r.get('/about', about)
r.get('/name', name)
r.get('/chat', chat)
r.get('/chatbox', chatbox)
r.get('/api/name', nameAPI)
r.get('/api/msg', msgAPI)

app.use(r.routes())

const port = process.env.PORT || 8000

app.listen(port)
console.log(cyan(`Listening on ${cyan(`http://localhost:${port}`)}.`))
