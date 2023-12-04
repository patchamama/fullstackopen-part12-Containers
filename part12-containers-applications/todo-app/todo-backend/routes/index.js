const express = require('express')
const router = express.Router()

const configs = require('../util/config')
// const { set } = require('../app')
const { updateRedis } = require('../util/redis')

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
  updateRedis().then((added_todos) => {
    res.send({
      added_todos,
    })
  })
})

module.exports = router
