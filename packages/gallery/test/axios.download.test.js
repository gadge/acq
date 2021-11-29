import { Baro }                                   from 'baro'
import { DEZEEN_REQUEST_HEADERS }                 from '../resources/customRequestHeaders'
import { DEZEEN_BARO_CONFIG, DEZEEN_BARO_LAYOUT } from '../resources/throbberConfigs'
import { ImagePorter }                            from '../src/ImagePorter'
import { dezeenPathBuilder }                      from '../util/pathBuilders'


// const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
// const url = 'https://en.wikipedia.org/wiki/Coca-Cola#/media/File:6_Coca-Cola_bottles.jpg'
const url = 'https://static.dezeen.com/uploads/2021/11/nodi-office-white-arkitekter-extra_dezeen_2364_col_1.jpg'

const progressFactory = Baro.build(DEZEEN_BARO_CONFIG, DEZEEN_BARO_LAYOUT,)

const imagePorter = new ImagePorter('003', DEZEEN_REQUEST_HEADERS, dezeenPathBuilder, progressFactory)
imagePorter.saveImage(url)
  .then(() => {
    // multiBar.stop()
    progressFactory.stop()
  })



