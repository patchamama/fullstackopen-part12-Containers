const express = require('express')
const { Todo } = require('../mongo')
const { updateRedis } = require('../util/redis')
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
  updateRedis(1)

  res.send(todo)
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
  // Increment added_todos counter in Redis if done is false
  if (req.body.done === false) {
    updateRedis(-1)
  }

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
  if (req.body.done === false) {
    updateRedis(1)
  }

  const todo = await Todo.findByIdAndUpdate(req.todo.id, {
    text: req.body.text,
    done: req.body.done,
  })
  res.send(todo)
})

router.use('/:id', findByIdMiddleware, singleRouter)

// updateRedis()

module.exports = router
