import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Calendar Days', () => {
  it('Sample', async () => {
    const response = await request.post('/calendarDays').send({
      numbers: [
        2013, 2, 3, 35, 32, 34, 63, 65, 66, 61, 95, 97, 126, 127, 121, 122, 124, 154, 152, 184, 185,
        186, 187, 188, 218, 219, 213, 215, 245, 247, 248, 249, 250, 280, 278, 309, 311, 336, 338,
        339, 340, 335,
      ],
    })
    expect(response.status).toEqual(200)
    expect(response.body.part1).toEqual(
      '  wt   ,m   f s,m wt s ,    f s,mtwt s ,m    s ,  wtfss, twt s ,m wtfs ,m    s , t t   ,m wtf s,'
    )

    const response2 = await request.post('/calendarDays').send({
      numbers: response.body.part2,
    })
    expect(response2.status).toEqual(200)
    expect(response2.body.part1).toEqual(
      '  wt   ,m   f s,m wt s ,    f s,mtwt s ,m    s ,  wtfss, twt s ,m wtfs ,m    s , t t   ,m wtf s,'
    )
  })
})

afterAll(() => {
  app.close()
})
