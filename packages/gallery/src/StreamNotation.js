import { valid } from '@typen/nullish'
import { time }  from '@valjoux/timestamp'

export class StreamNotation {
  constructor(data) {
    this.agent = data.agent
    this.size = 0
    this.url = data.url
    this.path = null
    this.stage = data.stage
    this.status = null
    this.timestamp = time()
  }
  static build(data) { return new StreamNotation(data) }
  get value() { return this.size }
  get stageStamp() {
    let tx = `[${this.stage}]`
    if (this.status) tx += ` (${this.status})`
    return tx
  }
  increment(value) {
    this.size += value
    return this
  }
  async* recordStream(source) {
    for await (const chunk of source) {
      this.size += chunk?.length
      yield await chunk
    }
  }
  stop() {
    this.last = -1
    return this
  }
  setPath(path) {
    this.path = path
    return this
  }
  setStage(stage, status) {
    this.stage = stage
    if (valid(status)) this.status = status
  }

}