const model = require('../model/costumes.model')

function getAll (req, res, next) {
  const limit = req.query.limit
  const result = model.getAll(limit)
  res.status(200).json({costumes : result})
}

function getOne (req, res, next) {
  const id = req.params.id
  const result = model.getOne(id)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(200).json({ character: result })
  }
}

function create (req, res, next) {
  const body = req.body
  const result = model.create(body)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(201).json({ costume: result })
  }
}

function update (req, res, next) {
  const id = req.params.id
  const body = req.body
  const result = model.update(id, body)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(200).json({ costume: result })
  }
}

function destroy (req, res, next) {
  const id = req.params.id
  const result = model.destroy(id)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(200).json({ remainingCostumes: result })
  }
}

// TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS

function  getAllTags (req, res, next) {
  const limit = req.query.limit
  const id = req.params.id
  const result = model.getAllTags(limit, id)
  res.status(200).json({tags : result})
}

function  getOneTag (req, res, next) {
  const tagId = req.params.tagid
  const id = req.params.id
  const result = model.getOneTag(id, tagId)

  if(result.errors){
    next({ status: 404, message: `Could not find tag`, errors: result.errors })
  }else{
    res.status(200).json({ tag: result })
  }
}

function  createTag (req, res, next) {
  const id = req.params.id
  const body = req.body
  const result = model.createTag(body, id)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(201).json({ tag: result })
  }
}

function  updateTag (req, res, next) {
  const id = req.params.id
  const tagId = req.params.tagid
  const body = req.body
  const result = model.updateTag(id, tagId, body)

  if(result.errors){
    next({ status: 404, message: `Could not find costume`, errors: result.errors })
  }else{
    res.status(200).json({ tag: result })
  }
}

function  destroyTag (req, res, next) {
  const id = req.params.id
  const tagId = req.params.tagid
  const result = model.destroyTag(id, tagId)

  if(result.errors){
    next({ status: 404, message: `Could not find costume or tag`, errors: result.errors })
  }else{
    res.status(200).json({ remainingCostumes: result })
  }
}


module.exports = {getAll, getOne, create, update, destroy, getAllTags, getOneTag, createTag, updateTag, destroyTag}
