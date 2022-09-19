import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Sum Endpoint Tests', () => {
  it('Normal', async () => {
    const response = await request.post('/echo').send({
      text: 'random text',
    })
    expect(response.status).toEqual(200)
    expect(response.body.text).toEqual('random text')
  })
  it('Empty String', async () => {
    const response = await request.post('/echo').send({
      text: '',
    })
    expect(response.status).toEqual(422)
  })
})

afterAll(() => {
  app.close()
})
