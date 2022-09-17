import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Travelling Suisse Robot', () => {
  it('Sample', async () => {
    const response = await request
      .post('/travelling-suisse-robot')
      .set('Content-Type', 'text/plain')
      .send(
        `                                 
    D     E      I    
                      
    O                 
                      
    C            T    
                      
    X                 
                      
E S   S       I     U    S    
                      `
      )
    expect(response.status).toBe(200)
    expect(response.headers['content-type']).toEqual('text/plain')
  })
})

afterAll(() => {
  app.close()
})
