import { parsePath }    from '@acq/path'
import { CONTENT_TYPE } from '../resources/headers'

export const dezeenPathBuilder = (url, headers) => {
  let { dir, base, ext } = parsePath(url)
  let ms, ph
  if (( ms = headers[CONTENT_TYPE].match(/(?<=image\/)\w+/) ) && ( [ ph ] = ms )) { ext = '.' + ph } // 'image/webp'
  return process.cwd() + '/images/' + base + ext
}