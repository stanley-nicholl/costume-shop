const ctlr = require('../controller/costumes.controller')
const express = require('express')
const router = express.Router()


router.get('/', ctlr.getAll)
router.get('/:id', ctlr.getOne)
router.post('/', ctlr.create)
router.put('/:id', ctlr.update)
router.delete('/:id', ctlr.destroy)

// TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS

router.get('/:id/tags', ctlr.getAllTags)
router.get('/:id/tags/:tagid', ctlr.getOneTag)
router.post('/:id/tags', ctlr.createTag)
router.put('/:id/tags/:tagid', ctlr.updateTag)
router.delete('/:id/tags/:tagid', ctlr.destroyTag)

module.exports = router
