import axios       from 'axios'
import fs          from 'fs'
import path        from 'path'
import ProgressBar from 'progress'

const DATA = 'data'

export class ImageShow {
  static saveCollection(urls) {

  }
}
async function saveImageCollection() {
  const url = 'https://images.unsplash.com/photo-1504164996022-09080787b6b3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&dl=markus-spiske-AaEQmoufHLk-unsplash.jpg'

  console.log('Connecting …')
  const { data, headers } = await axios({ url, method: 'GET', responseType: 'stream' })
  const length = headers['content-length']

  console.log('Starting download')
  const progressBar = new ProgressBar('-> [:bar] :percent :etas', {
    width: 5,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(length)
  })

  const writer = fs.createWriteStream(path.resolve(process.cwd(), 'images', 'code.jpg'))
  data.on(DATA, chunk => progressBar.tick(chunk.length))
  data.pipe(writer)
}

saveImageCollection().then()