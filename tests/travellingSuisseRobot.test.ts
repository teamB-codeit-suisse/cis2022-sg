import supertest from 'supertest'
import app from '../src/server'
const request = supertest(app)

describe('Calendar Days', () => {
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
  })
})

afterAll(() => {
  app.close()
})
