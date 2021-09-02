const express = require ('express')
const router = express.Router()
const habitsController = require('./controllers/habits')

router.get('/', habitsController.index)
router.post('/', habitsController.create)


router.get('/:name', habitsController.show)
router.put('/:name', habitsController.update)
router.put('/:name/:count', habitsController.updateCount)
router.delete('/:name', habitsController.destroy)

module.exports = router;
