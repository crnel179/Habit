const express = require ('express')
const router = express.Router()
const habitsController = require('./controllers/habits')

router.get('/habits', habitsController.index)
//this one might not be needed
router.get('/habits/:name', habitsController.findByName)
router.post('/habits', habitsController.create)
router.put('/habits/:name', habitsController.update)
router.delete('/habits/:name', habitsController.destroy)



module.exports = router;