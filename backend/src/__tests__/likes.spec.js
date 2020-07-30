const request = require('supertest')
const app = require('../app')

describe('Likes', () => {
  it('should be able to give a like to the repository', async () => {
    const repository = await request(app)
      .post('/repositories')
      .send({
        title: 'Umbriel',
        url: 'https://github.com/Rocketseat/umbriel',
        techs: ['Node', 'Express', 'TypeScript']
      })

    const response = await request(app).post(
      `/repositories/${repository.body.id}/like`
    )

    expect(response.body).toMatchObject({
      likes: 1
    })
  })

  it('should not be able to like a repository that does not exist', async () => {
    await request(app)
      .post('/repositories/123/like')
      .expect(400)
  })
})
