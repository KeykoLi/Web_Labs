const { Router } = require("express")

const router = new Router()
const complexController = require(`../controller/complex.controller`)

router.post('/complex', complexController.create)
router.get('/complex', complexController.getAll)
router.get('/complex/:id', complexController.getOne)
router.put('/complex', complexController.update)
router.delete('/complex/:id', complexController.delete)

module.exports = router