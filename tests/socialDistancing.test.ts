import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Social Distancing', () => {
  it('Sample', async () => {
    const response = await request
      .post('/social-distancing')
      .send(['3, 3, 2', '1, 1, 10', '4, 3, 3, 0, 0, 0, 1'])
    expect(response.status).toEqual(200)
    expect(response.body).toEqual([4, 'No Solution', 6])
  })
})

afterAll(() => {
  app.close()
})
