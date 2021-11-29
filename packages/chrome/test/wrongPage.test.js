import { delogger }     from '@spare/deco'
import { Deco, logger } from '@spare/logger'
import { Chrome }       from '../src/Chrome'

// https://example.com/404
// https://static.dezeen.com/uploads/2021/05/spacial-co-working-office-ivy-studio-montreal-canada-interiors_dezeen_2364_col_44.jpg
// https://en.wikiquote.org/woki/wrong_page.html

const wrongPageTest = async () => {
  const chrome = await Chrome.build()
  try {
    const page = await chrome.openPage('https://static.dezeen.com/uploads/2021/05/spacial-co-working-office-ivy-studio-montreal-canada-interiors_dezeen_2364_col_44.jpg')

    const response = await page.waitForResponse(response => {
      console.log('Page response status:', response.status())
      console.log('Page response url:', response.url())
      console.log('Page response ok:', response.ok())
      response.buffer()
      return true
    })

    response |> Deco({ depth: 1 }) |> logger

    const content = await page.content()
    content |> delogger
    await page.close()
  } catch (err) {
    console.log('Error loading page:', err)
  }
  await chrome.close()
}
wrongPageTest().then()