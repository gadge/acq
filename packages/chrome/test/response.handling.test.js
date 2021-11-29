import { says, Xr } from '@spare/logger'
import puppeteer    from 'puppeteer'

const RESPONSE = 'response'
const test = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on(RESPONSE, async response => {
    Xr()
      .status(response.status())
      .url(response.url())
      .ok(response.ok()) |> says['puppeteer'].p('response')
    if (response.status() === 404) {
      return void ( Xr().title(response.status()) |> says['puppeteer'].p('terminate') )
    }
  })
  await page.goto('https://static.dezeen.com/uploads/2021/05/spacial-co-working-office-ivy-studio-montreal-canada-interiors_dezeen_2364_col_44.jpg')
  const title = await page.title()

  Xr().title(title) |> says['puppeteer']

  await page.close()
  await browser.close()
}

test().then()