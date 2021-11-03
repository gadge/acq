import { delogger } from '@spare/deco'
import { Chrome }   from '../src/Chrome'

const wrongPageTest = async () => {
  const chrome = await Chrome.build()
  const page = await chrome.newTab('https://en.wikiquote.org/woki/wrong_page.html')
  const content = await page.content()
  content |> delogger
  await page.close()
  await chrome.closeBrowser()
}

wrongPageTest().then()