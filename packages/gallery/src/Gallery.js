import { Contractor }        from '@geia/contractor'
import { maxBy }             from '@vect/vector-indicator'
import { shuffle }           from '@vect/vector-select'
import { ARTIST_COLLECTION } from '../resources/artistCollection'
import { ImagePorter }       from './ImagePorter'

export class Gallery {
  constructor({ population, headers, path, barFab }) {
    this.barFab = barFab
    const names = shuffle(ARTIST_COLLECTION, population)
    const width = maxBy(names, x => x.length)
    this.agents = names.map(id => ImagePorter.build({
        id: id.padEnd(width),
        headers,
        path,
        barFab: this.barFab
      })
    )
    this.contractor = Contractor.build(ImagePorter.prototype.saveImage, this.agents)
  }
  static build(options) { return new Gallery(options) }
  async saveImages(urls) {
    const results = await this.contractor.takeOrders(urls)
    await this.barFab.stop()
    return results
  }
}