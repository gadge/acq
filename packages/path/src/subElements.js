import { promises }  from 'fs'
import { parsePath } from './parsePath'

export const subFolders = async (dir) =>
  await promises
    .readdir(dir, { withFileTypes: true })
    .then(elements => elements
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
    )

export const subFiles = async (dir) => await promises
  .readdir(dir, { withFileTypes: true })
  .then(elements => elements
    .filter(dirent => !dirent.isDirectory())
    .map(dirent => dirent.name)
  )

export const subFileInfos = async (dir) => {
  let id = 0
  return await promises
    .readdir(dir, { withFileTypes: true })
    .then(elements => elements
      .filter(dirent => !dirent.isDirectory())
      .map(dirent => {
        const fileInfo = parsePath(dirent.name)
        fileInfo.id = id++
        fileInfo.dir = dir
        return fileInfo
      })
    )
}