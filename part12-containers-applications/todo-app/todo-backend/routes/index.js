const express = require('express')
const router = express.Router()
const { setAsync, getAsync } = require('../redis')

const configs = require('../util/config')
const { set } = require('../app')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits,
  })
})

/* statistics  */
router.get('/statistics', async (_, res) => {
  const added_todos = parseInt(await getAsync('added_todos')) || 0
  res.send({
    added_todos,
  })
})

module.exports = router
