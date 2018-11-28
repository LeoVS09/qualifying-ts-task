import Miner from './index'
import fetch from './plugins/fetch'
import pick from './plugins/pick'
import pipe from './plugins/pipe'

const samples = {
  URL: 'https://stackoverflow.com',
  selector: `
    .question-summary@questions|slice(0, 3) {
      .question-hyperlink[href=$link]{$title};
      .votes span[title=$votes];
      .status span[title=$answers];
      .views span[title=$views];
      .started .relativetime[title=$time];
      .started .reputation-score{$score};
    }
  `
}

describe('Basic level suit', () => {

  test('Server response status as 200', async () => {
    const { status } = await fetch(samples.URL)

    expect(status).toEqual(200)
  })


  test('Server response body as HTML', async () => {
    const { body } = await fetch(samples.URL)

    expect(body).toMatch('question-summary')
  })


  test('Extract data from HTML', async () => {
    const { body } = await fetch(samples.URL)
    const data = await pick(samples.selector, body)

    expect(data.questions[0]).toHaveProperty('score')
  })


  test('Tranform data to array of top 3 remapped objects', async () => {
    const { body } = await fetch(samples.URL)
    const data = await pick(samples.selector, body)
    const piped = await pipe(function(){}, data)

    expect(piped[1]).not.toHaveProperty('score')
    expect(piped[1]).toHaveProperty('link')
    expect(piped).toHaveLength(3)
  })

})

describe('Intermediate level suit', () => {

  /* Раскомментируйте содержимое теста 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Chaining actions', async () => {
    // const miner = await new Miner()
    // const chained = miner
    //   .fetch(samples.URL)
    //   .pick(samples.selector)
    //   .pipe(function(){})

    // expect(chained[1]).not.toHaveProperty('score')
    // expect(chained[1]).toHaveProperty('link')
    // expect(chained).toHaveLength(3)
  })


  /* Раскомментируйте содержимое теста 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Branching chains', async () => {
    // const miner = await new Miner()
    // const fetched = miner.fetch(samples.URL)
    // const picked = fetched.pick(samples.selector)
    // const piped = picked.pipe(function(){})

    // expect(piped[1]).not.toHaveProperty('score')
    // expect(piped[1]).toHaveProperty('link')
    // expect(piped).toHaveLength(3)
  })


  /* Раскомментируйте содержимое теста 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Concurrent actions', async () => {
    // const miner = await new Miner()
    // const sources = Array(9).fill(samples.URL)

    // const pipeEach = src => miner
    //   .fetch(src)
    //   .pick(samples.selector)
    //   .pipe(function(){})

    // const testEach = data => {
    //   expect(data[1]).not.toHaveProperty('score')
    //   expect(data[1]).toHaveProperty('link')
    //   expect(data).toHaveLength(3)
    // }

    // const piped = await Promise.map(sources, pipeEach, {concurrency: 3})

    // piped.forEach(testEach)
  })

  /* Раскомментируйте содержимое, доработайте тест 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Plug actions on the fly', async () => {
    // const miner = await new Miner()
    // const customPlugin = async (...args) => await args
    // const customPlugin2 = async () => await previousData.reduce((a, b) => a + b, 0)
    
    // miner.plug(customPlugin, customPlugin2)

    // const data = miner
    //   .customPlugin(1, 2)
    //   .customPlugin2()

    // expect(data).toEqual(3)
  })

  /* Раскомментируйте содержимое, доработайте тест 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Plug actions on instance', async () => {

    // const customPlugin = async (...args) => await args
    // const customPlugin2 = async () => await previousPluginData.reduce((a, b) => a + b, 0)
    
    // const miner = await new Miner({
    //   plugins: [
    //     customPlugin,
    //     customPlugin2
    //   ]
    // })

    // const data = miner
    //   .customPlugin(1, 2)
    //   .customPlugin2()

    // expect(data).toEqual(3)
  })

  /* Раскомментируйте содержимое, доработайте тест 
  и разработайте функциональную часть, ему удовлетворяющую */

  test('Nesting actions', async () => {

    // const miner = await new Miner()

    // const customPlugin = async (...args) => {
    //   return await someContext
    //     .fetch(samples.URL)
    //     .pick(samples.selector)
    //     .pipe(function(){})
    // }
    
    // miner.plug(customPlugin)

    // const data = miner.customPlugin()

    // expect(data[1]).not.toHaveProperty('score')
    // expect(data[1]).toHaveProperty('link')
    // expect(data).toHaveLength(3)

  })

})
