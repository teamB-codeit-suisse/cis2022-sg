import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Quordle Keyboard', () => {
  it('Sample', async () => {
    const response = await request.post('/quordleKeyboard').send({
      answers: ['YRWWX', 'XXPQB', 'ODXDL', 'KQNTQ'],
      attempts: ['BTTHO', 'YRWWX', 'WNRAQ', 'ODXDL', 'XXPQB', 'KQNTQ'],
      numbers: [
        477, 42, 215, 32, 418, 51, 680, 321, 423, 315, 2, 79, 151, 4, 8, 515, 532, 51, 61, 31, 703,
        207, 19, 51, 15,
      ],
    })
    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
      part1: '423613132151525',
      part2: 'NVVWCCEFGIJMSUVZ',
    })
  })
})

afterAll(() => {
  app.close()
})
