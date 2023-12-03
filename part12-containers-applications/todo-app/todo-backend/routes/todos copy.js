const express = require('express')
const { Todo } = require('../mongo')
// const { setAsync, getAsync } = require('../redis')
const { init } = require('../app')
const router = express.Router()

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos)
})

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  })

  // Increment added_todos counter in Redis
  // const added_todos = await getAsync('added_todos') // || setAsync('added_todos', '0')
  // await setAsync('added_todos', parseInt(added_todos) + 1)

  res.send(todo)
})

/* statistics  */
router.get('/statistics', async (_, res) => {
  const added_todos = await Todo.find({ done: false }).countDocuments()
  // const added_todos = await getAsync('added_todos')
  res.send({
    added_todos,
  })
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
  // res.sendStatus(405); // Implement this
})

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  // res.sendStatus(405) // Implement this

  // Increment added_todos counter in Redis if done is false
  // if (req.body.done === false) {
  //   const added_todos = await getAsync('added_todos')
  //   await setAsync('added_todos', parseInt(added_todos) + 1)
  // }

  const todo = await Todo.findByIdAndUpdate(req.todo.id, {
    text: req.body.text,
    done: req.body.done,
  })
  res.send(todo)
})

router.use('/:id', findByIdMiddleware, singleRouter)

// const initRedis = async () => {
//   const todos = await Todo.find({})
//   await setAsync('added_todos', todos.length)
// }

// initRedis()

module.exports = router
