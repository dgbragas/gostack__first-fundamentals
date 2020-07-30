const express = require('express')
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4')

const app = express()

app.use(express.json())
app.use(cors())

const repositories = []

function validateRepositorieId (request, response, next) {
  const { params: { id } } = request

  if (!isUuid(id)) return response.status(400).json({ error: 'Invalid repositorie ID' })

  return next()
}

app.use('/repositories/:id', validateRepositorieId)

app.get('/repositories', (_, response) => {
  return response.json(repositories)
})

app.post('/repositories', (request, response) => {
  const { body: { title, url, techs } } = request

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
    createdAt: new Date()
  }

  repositories.push(repositorie)

  return response.json(repositorie)
})

app.put('/repositories/:id', (request, response) => {
  const { params: { id } } = request
  const { body: { title, url, techs } } = request

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  const editedRepositorie = { ...repositories[repositorieIndex], title, url, techs }

  repositories[repositorieIndex] = editedRepositorie

  return response.json(editedRepositorie)
})

app.delete('/repositories/:id', (request, response) => {
  const { params: { id } } = request

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  repositories.splice(repositorieIndex, 1)

  return response.status(204).json()
})

app.post('/repositories/:id/like', (request, response) => {
  const { body, params: { id } } = request
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id)

  if (Object.keys(body).length > 0) {
    return response.status(400).json({
      message: 'Its not possible update likes manually',
      likes: repositories[repositorieIndex].likes
    })
  }

  const likes = repositories[repositorieIndex].likes += 1

  return response.json({ likes })
})

module.exports = app
