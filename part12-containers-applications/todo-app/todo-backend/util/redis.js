const e = require('express')
const { setAsync, getAsync } = require('../redis')
const { Todo } = require('../mongo')

const key = 'added_todos'

const updateRedis = async (count = 0) => {
  const countRedis = await getAsync(key)
  if (countRedis) {
    await setAsync(key, parseInt(countRedis) + count)
  } else {
    const todos = await Todo.find({ done: false })
    await setAsync(key, todos.length + count)
  }

  const result = await getAsync(key)

  return parseInt(result)
}

module.exports = { updateRedis }
