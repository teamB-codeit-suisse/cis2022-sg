import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Sum Endpoint Tests', () => {
  it('Both Positive', async () => {
    const response = await request.post('/sum').send({
      a: 5,
      b: 9,
    })
    expect(response.status).toEqual(200)
    expect(response.body.sum).toEqual(14)
  })
  it('Both Negative', async () => {
    const response = await request.post('/sum').send({
      a: -19,
      b: -10,
    })
    expect(response.status).toEqual(200)
    expect(response.body.sum).toEqual(-29)
  })
})

afterAll(() => {
  app.close()
})
