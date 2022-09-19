import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Ticker Stream Part 1', () => {
  it('Single ticker', async () => {
    const response = await request.post('/tickerStreamPart1').send({
      stream: ['00:00,A,5,5.5'],
    })
    expect(response.status).toEqual(200)
    expect(response.body.output).toEqual(['00:00,A,5,27.5'])
  })
  it('Multiple tickers', async () => {
    const response = await request.post('/tickerStreamPart1').send({
      stream: ['00:00,B,4,4.4', '00:00,A,5,5.5'],
    })
    expect(response.status).toEqual(200)
    expect(response.body.output).toEqual(['00:00,A,5,27.5,B,4,17.6'])
  })
})

describe('Ticker Stream Part 2', () => {
  it('Single ticker', async () => {
    const response = await request.post('/tickerStreamPart2').send({
      stream: ['00:05,A,1,5.6', '00:00,A,1,5.6', '00:02,A,1,5.6', '00:03,A,1,5.6', '00:04,A,1,5.6'],
      quantityBlock: 5,
    })
    expect(response.status).toEqual(200)
    expect(response.body.output).toEqual(['00:05,A,5,28.0'])
  })
  it('Multiple tickers', async () => {
    const response = await request.post('/tickerStreamPart2').send({
      stream: ['00:01,A,5,5.5', '00:00,A,4,5.6', '00:00,B,5,5.5', '00:02,B,4,5.6'],
      quantityBlock: 5,
    })
    expect(response.status).toEqual(200)
    expect(response.body.output).toEqual(['00:00,B,5,27.5', '00:01,A,5,27.9'])
  })
})

afterAll(() => {
  app.close()
})
