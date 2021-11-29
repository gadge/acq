import { decoFlat, decoString, says, Xr } from '@spare/logger'
import { NUM }                            from '@typen/enum-data-types'
import { init }                           from '@vect/vector-init'
import puppeteer                          from 'puppeteer'
import { Contractor }                     from './Contractor'

/**
 *
 */
export class Chrome {
  /** @type {Browser} */ browser
  // /** @type {Page} */ pages
  constructor() { }

  static async build() {
    const chrome = new Chrome()
    await chrome.open()
    return chrome
  }

  // const options = {
  //   headless: false,
  //   slowMo: 250,// slow down by 250ms
  // }
  async open(browserOptions = {}) {
    this.browser = await puppeteer.launch(browserOptions)
    return this
  }

  async close() {
    await this.browser.close()
    return !this.browser?.isConnected()
  }

  async openPage(url, options) {
    const page = await this.browser.newPage()
    if (url) await page.goto(url, options)
    return page
  }

  async openPages(info, options) {
    if (typeof info === NUM) return await Promise.all(init(info, () => this.openPage()))
    if (Array.isArray(info)) return await Promise.all(info.map((url) => this.openPage(url, options)))
    return null
  }

  async closePages(pages) {
    return await Promise.all(pages.map(page => page.close()))
  }

  async evalPages({ limit, urls, selector, options, log }) {
    const pageSelector = PageSelectorFactory.build(selector, options)
    const pages = await this.openPages(limit)
    if (log) Xr().pages(decoFlat(pages.map(pageId))) |> says['chrome'].br('created')
    const contractor = Contractor.build(pageSelector, pages, pageId) // the internal pageSelector use page as 'this'
    const samples = await contractor.takeOrders(urls, log)
    if (log) Xr().pages(decoFlat(pages.map(pageId))) |> says['chrome'].br('closing')
    await this.closePages(pages)
    return samples
  }
}

class PageSelectorFactory {
  static build(selector, options) {
    return async function (url) {
      /** @type {Page} */ const page = this
      await page.goto(url, options)
      return await selector(page) // input selector use page as arg
    }
  }
}

export const pageId = page => {
  const id = page.mainFrame()._id
  return decoString(id.slice(0, 2) + '-' + id.slice(-4))
}