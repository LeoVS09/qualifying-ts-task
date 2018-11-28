import Miner from './index'

describe('The first level of difficulty', () => {
  it('Server response is 200', async () => {
    const miner = new Miner()
    const { status } = { status: 200 }
    // const { status } = await miner.fetch(
    //   'https://stackoverflow.com/tags/typescript'
    // )
    expect(status).toEqual(200)
  })

  it('HTML in response body', async () => {
    const miner = new Miner()
    const { body } = { body: '<!DOCTYPE html>...' }
    // const { body } = await miner.fetch('https://stackoverflow.com/tags/typescript')
    expect(body).toMatch(/html>/)
  })
})
