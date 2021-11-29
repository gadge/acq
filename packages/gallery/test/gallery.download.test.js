import { logger }                                 from '@spare/logger'
import { Baro }                                   from 'baro'
import { promises }                               from 'fs'
import { DEZEEN_REQUEST_HEADERS }                 from '../resources/customRequestHeaders'
import { DEZEEN_BARO_CONFIG, DEZEEN_BARO_LAYOUT } from '../resources/throbberConfigs'
import { Gallery }                                from '../src/Gallery'
import { dezeenPathBuilder }                      from '../util/pathBuilders'


const urls = [
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_hero.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_2.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_7.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_15.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_19.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_35.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_37.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_14.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_39.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-floor-plan_dezeen_2364_col_0.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_1.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_5.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_6.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_8.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_10.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_11.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_16.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_17.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_20.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_22.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_24.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_27.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_28.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_29.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_30.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_31.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_38.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_0.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_3.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_4.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_9.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_12.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_13.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_18.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_21.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_23.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_25.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_26.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_32.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_33.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_34.jpg',
  'https://static.dezeen.com/uploads/2021/11/carnegie-hill-apartment-mkca-interiors_dezeen_2364_col_36.jpg',
]

const SRC = process.cwd()

const test = async (urls) => {
  await promises.mkdir(SRC + '/images', { recursive: true });
  `>> downloading: ${urls.length}` |> logger
  const gallery = Gallery.build({
    population: 3,
    headers: DEZEEN_REQUEST_HEADERS,
    path: dezeenPathBuilder,
    barFab: Baro.build(DEZEEN_BARO_CONFIG, DEZEEN_BARO_LAYOUT)
  })
  await gallery.saveImages(urls)
}

test(urls).then()

