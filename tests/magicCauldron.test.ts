import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Magic Cauldron', () => {
  it('Sample', async () => {
    const response = await request.post('/magiccauldrons').send([
      {
        part1: {
          flow_rate: 20,
          time: 1,
          row_number: 0,
          col_number: 0,
        },
        part2: {
          flow_rate: 10,
          amount_of_soup: 10.0,
          row_number: 0,
          col_number: 0,
        },
        part3: {
          flow_rate: 30,
          time: 2,
          row_number: 0,
          col_number: 0,
        },
        part4: {
          flow_rate: 50,
          amount_of_soup: 100.0,
          row_number: 0,
          col_number: 0,
        },
      },
      {
        part1: {
          flow_rate: 23,
          time: 1,
          row_number: 0,
          col_number: 0,
        },
        part2: {
          flow_rate: 17,
          amount_of_soup: 34.0,
          row_number: 0,
          col_number: 0,
        },
        part3: {
          flow_rate: 36,
          time: 1,
          row_number: 0,
          col_number: 0,
        },
        part4: {
          flow_rate: 5,
          amount_of_soup: 20.0,
          row_number: 0,
          col_number: 0,
        },
      },
    ])
    expect(response.status).toEqual(200)
    expect(response.body).toEqual([
      {
        part1: 20.0,
        part2: 1,
        part3: 60.0,
        part4: 2,
      },
      {
        part1: 23.0,
        part2: 2,
        part3: 36.0,
        part4: 4,
      },
    ])
  })
})

afterAll(() => {
  app.close()
})
