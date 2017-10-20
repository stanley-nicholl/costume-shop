const uuid = require('uuid')
const fs = require('fs')

// COSTUME AREA

function getAll (limit) {
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  return limit ? data.costumes.slice(0,limit) : data.costumes
}

function getOne (id) {
  const errors = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  if(!costume){
    errors.push(`No character with ID ${id}`)
    response = errors
  }else{
    response = costume
  }
  return response
}

function create (body) {
  const errors = []
  const { name, price, description, image } = body
  const tags = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  if(!name || !price || !description || !image){
    errors.push('Fields name, price, description, and image are required')
    response = { errors }
  }else{
    const id = uuid()
    const costume = { id, name, price, description, image, tags }
    data.costumes.push(costume)
    response = costume
    data = JSON.stringify(data)
    fs.writeFileSync('./costume.data.json', data)
  }
  return response
}

function update (id, body) {
  const errors = []
  const { name, price, description, image } = body
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  if (!costume) {
    errors.push(`Could not find character with id of ${id}`)
    response = { errors }
  } else if(!name || !price || !description || !image){
    errors.push('Fields name, price, description, and image are required')
    response = { errors }
  }else{
  costume.name = name
  costume.price = price
  costume.image = image
  costume.description = description
  response = costume
  data = JSON.stringify(data)
  fs.writeFileSync('./costume.data.json', data)
  }
  return response
}

function destroy (id) {
  const errors = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  if (!costume) {
    errors.push(`Could not find costume with id of ${id}`)
    response = { errors }
  } else{
    const index = data.costumes.indexOf(costume)
    data.costumes.splice(index,1)
    data = JSON.stringify(data)
    fs.writeFileSync('./costume.data.json', data)
    response = costume
  }
  return response
}

// TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS TAGS

function  getAllTags (limit, id) {
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  const costume = data.costumes.find(cost => {
    return cost.id === id
  })
  return limit ? costume.tags.slice(0,limit) : costume.tags
}

function  getOneTag (id, tagId) {
  const errors = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  const tag = costume.tags.find(tag => {
    return tag === tagId
  })

  if(!costume){
    errors.push(`No character with ID ${id}`)
    response = errors
  }else if(!tag){
    errors.push(`No tags with ID ${tagId}`)
    response = errors
  }else{
    response = tag
  }
  return response
}

function  createTag (body, id) {
  const errors = []
  const { name, color } = body
  const tags = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  if(!costume){
    errors.push(`No character with ID ${id}`)
    response = { errors }
  }else if(!name || !color){
    errors.push('Fields name and color are required')
    response = { errors }
  }else{
    const id = uuid()
    const tag = { id, name, color }
    costume.tags.push(tag.id)
    data.tags.push(tag)
    response = tag
    data = JSON.stringify(data)
    fs.writeFileSync('./costume.data.json', data)
  }
  return response
}

function  updateTag (id, tagId, body) {
  console.log('test model');
  const errors = []
  const { name, color } = body
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  const constumeTag = costume.tags.find(tag => {
    return tag === tagId
  })

  const tag = data.tags.find(tag => {
    return tag.id === tagId
  })

  if(!costume){
    errors.push(`No character with ID ${id}`)
    response = { errors }
  }else if(!name || !color){
    errors.push('Fields name and color are required')
    response = { errors }
  }else{
    const tag = { tagId, name, color }
    costume.tags.id = tagId
    costume.tags.name = name
    costume.tags.color = color
    data.tags.push(tag)
    response = tag
    data = JSON.stringify(data)
    fs.writeFileSync('./costume.data.json', data)
  }
  return response
}

function  destroyTag (id, tagId) {
  const errors = []
  let data = fs.readFileSync('./costume.data.json', 'utf-8')
  data = JSON.parse(data)
  let response

  const costume = data.costumes.find(cost => {
    return cost.id === id
  })

  const tag = costume.tags.find(tag => {
    return tag === tagId
  })

  if (!costume) {
    errors.push(`Could not find costume with id of ${id}`)
    response = { errors }
  }else if(!tag){
    errors.push(`Could not find tag with id of ${tagId}`)
    response = { errors }
  }else{
    const index = costume.tags.indexOf(tag)
    costume.tags.splice(index,1)
    data = JSON.stringify(data)
    fs.writeFileSync('./costume.data.json', data)
    response = tag
  }
  return response
}




module.exports = {getAll, getOne, create, update, destroy, getAllTags, getOneTag, createTag, updateTag, destroyTag}
