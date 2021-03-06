const request = require('supertest')
const app = require('../app')
const { isUuid } = require('uuidv4')

describe('Repositories', () => {
  it('should be able to create a new repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript']
      })

    expect(isUuid(response.body.id)).toBe(true)

    expect(response.body).toMatchObject({
      url: 'https://github.com/Rocketseat/umbriel',
      title: 'Umbriel',
      techs: ['Node', 'Express', 'TypeScript'],
      likes: 0,
      createdAt: response.body.createdAt
    })
  })

  it('should be able to list the repositories', async () => {
    const { body: { id, title, url, techs, likes, createdAt } } = await request(app)
      .post('/repositories')
      .send({
        title: 'Umbriel',
        url: 'https://github.com/Rocketseat/umbriel',
        techs: ['Node', 'Express', 'TypeScript']
      })

    const response = await request(app).get('/repositories')

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id,
          url,
          title,
          techs,
          likes,
          createdAt
        }
      ])
    )
  })

  it('should be able to update repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        title: 'Umbriel',
        url: 'https://github.com/Rocketseat/umbriel',
        techs: ['Node', 'Express', 'TypeScript']
      })

    const response = await request(app)
      .put(`/repositories/${repository.body.id}`)
      .send({
        url: 'https://github.com/Rocketseat/unform',
        title: 'Unform',
        techs: ['React', 'React Native', 'TypeScript', 'ContextApi']
      })

    expect(isUuid(response.body.id)).toBe(true)

    expect(response.body).toMatchObject({
      url: 'https://github.com/Rocketseat/unform',
      title: 'Unform',
      techs: ['React', 'React Native', 'TypeScript', 'ContextApi']
    })
  })

  it('should not be able to update a repository that does not exist', async () => {
    await request(app).put('/repositories/123').expect(400)
  })

  it('should not be able to update repository likes manually', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['React', 'React Native', 'TypeScript', 'ContextApi']
      })

    const response = await request(app)
      .post(`/repositories/${repository.body.id}/like`)
      .send({
        likes: 15
      })

    expect(response.body).toMatchObject({
      message: 'Its not possible update likes manually',
      likes: 0
    })
  })

  it('should be able to delete the repository', async () => {
    const response = await request(app)
      .post('/repositories')
      .send({
        url: 'https://github.com/Rocketseat/umbriel',
        title: 'Umbriel',
        techs: ['Node', 'Express', 'TypeScript']
      })

    await request(app).delete(`/repositories/${response.body.id}`).expect(204)

    const repositories = await request(app).get('/repositories')

    const repository = repositories.body.find((repository) => repository.id === response.body.id)

    expect(repository).toBe(undefined)
  })

  it('should not be able to delete a repository that does not exist', async () => {
    await request(app).delete('/repositories/123').expect(400)
  })
})
