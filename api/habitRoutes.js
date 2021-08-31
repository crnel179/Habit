const express = require ('express')
const router = express.Router()
const habitsController = require('./controllers/habits')

router.get('/', habitsController.index)
router.get('/:name', habitsController.show)
router.post('/', habitsController.create)
router.put('/:name', habitsController.update)
router.delete('/:name', habitsController.destroy)



module.exports = router;