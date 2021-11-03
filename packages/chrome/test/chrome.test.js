import { logger, says } from '@spare/logger'
import { Chrome }       from '../src/Chrome'

const wrongPageTest = async () => {
  const chrome = await Chrome.build()
  const urls = [
    'https://en.wikiquote.org/woki/wrong_page.html',
    'https://en.wikiquote.org/woki/wrong_page.html',
    'https://en.wikiquote.org/woki/wrong_page.html'
  ]
  const selector = async page => {
    `evaluating page ${ page.mainFrame()._id }` |> logger
    return await page.content()
  }
  const results = await chrome.evalPages({ urls, selector, limit: 2, log: true })
  results.length |> logger
  const isShutDown = await chrome.closeBrowser()
  isShutDown |> says['chrome is shut down']
}

wrongPageTest().then()