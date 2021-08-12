import { basename, dirname, extname } from 'path'

export function parsePath(path) {
  const ext = extname(path)
  return {
    dir: dirname(path),
    base: basename(path, ext),
    ext: ext
  }
}

export function parsePathMultiExt(path) {
  const ext = basename(path).slice(basename(path).indexOf('.'))
  return {
    dir: dirname(path),
    base: basename(path, ext),
    ext: ext
  }
}