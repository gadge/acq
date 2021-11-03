import { Contractor } from '@geia/promise-lobby'
import { NUM }        from '@typen/enum-data-types'
import { init }       from '@vect/vector-init'
import puppeteer      from 'puppeteer'

/**
 *
 */
export class Chrome {
  /** @type {Browser} */ browser
  constructor() { }

  static async build() {
    const chrome = new Chrome()
    await chrome.openBrowser()
    return chrome
  }

  async openBrowser() {
    const options = {
      // headless: false,
      // slowMo: 250,
    } // slow down by 250ms}
    return ( this.browser = await puppeteer.launch(options) ), this
  }
  async closeBrowser() { return ( await this.browser.close() ), !this.browser?.isConnected() }

  async openTabs(info) {
    if (typeof info === NUM) return await Promise.all(init(info, () => this.newTab()))
    if (Array.isArray(info)) return await Promise.all(info.map((url) => this.newTab(url)))
    return null
  }

  async newTab(url) {
    const page = await this.browser.newPage()
    if (url) await page.goto(url)
    return page
  }

  static async closeTabs(tabs) { return await Promise.all(tabs.map(page => page.close())) }

  async openPages({ urls, selector, limit }) {
    const pageSelector = async function (url) {
      /** @type {Page} */ const page = this
      await page.goto(url)
      return await selector(page) // input selector use page as arg
    }
    const pages = await this.openTabs(limit)
    const contractor = Contractor.build(pageSelector, pages) // the internal pageSelector use page as 'this'
    const samples = contractor.takeOrders(urls)
    await Chrome.closeTabs(pages)
    return samples
  }
}