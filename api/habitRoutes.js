const express = require ('express')
const router = express.Router()
const habitsController = require('./controllers/habits')
const check = require('./middleware')

router.get('/:user/', habitsController.index)
router.post('/:user/', habitsController.create)


router.get('/:user/:name', check.tokenVerified, habitsController.show)
router.put('/:user/:name', check.tokenVerified, habitsController.update)
router.put('/:user/:name/:count', check.tokenVerified, habitsController.updateCount)
router.delete('/:user/:name', check.tokenVerified, habitsController.destroy)

module.exports = router;
