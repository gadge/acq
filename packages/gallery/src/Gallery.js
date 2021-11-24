import { flopGenerator } from '@aryth/rand'
import { Contractor }         from '@geia/contractor'
import { decoVector, logger } from '@spare/logger'
import { init }               from '@vect/vector-init'
import { Baro }          from 'baro'
import { ImagePorter }   from './ImagePorter'

export class Gallery {
  constructor({
                agentCount,
                requestHeaders,
                pathBuilder,
                barConfig,
                barLayout
              }) {
    const flopper = flopGenerator(ARTIST_COLLECTION, 'no-one')
    this.progressFactory = Baro.build(barConfig, barLayout)
    this.agentPool = init(agentCount, i => {
      return ImagePorter.build({
        id: flopper.next().value,
        requestHeaders,
        pathBuilder,
        progressFactory: this.progressFactory
      })
    })
    this.agentPool.map(x => x.id) |> decoVector |> logger
    this.contractor = Contractor.build(ImagePorter.prototype.saveImage, this.agentPool)
  }
  static build(options) { return new Gallery(options) }
  async saveImages(urls) {
    const results = await this.contractor.takeOrders(urls)
    this.progressFactory.stop()
    return results
  }
}