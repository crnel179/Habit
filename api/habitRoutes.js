const express = require('express')
const router = express.Router()
const habitsController = require('./controllers/habits')
const check = require('./middleware')

router.get('/:user/', habitsController.index)
router.post('/:user/', habitsController.create)
router.get('/:user/:name', habitsController.show)
router.put('/:user/:name', habitsController.update)
router.put('/:user/:name/:count', habitsController.updateCount)
router.delete('/:user/:name', habitsController.destroy)

module.exports = router;
