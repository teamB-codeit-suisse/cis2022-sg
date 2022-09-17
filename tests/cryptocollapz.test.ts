import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Crypto Collapz', () => {
    it('Sample', async () => {
        const response = await request.post('/cryptocollapz').send([
            // test case 1
            [ 1, 2, 3, 4, 5 ],
            // test case 2
            [ 6, 7, 8, 9, 10 ],
        ])
        expect(response.status).toEqual(200)
        expect(response.body).toEqual([
            // test case 1
            [ 4, 4, 16, 4, 16 ],
            // test case 2
            [ 16, 52, 8, 52, 16 ],
        ])
    })
})

afterAll(() => {
    app.close()
});