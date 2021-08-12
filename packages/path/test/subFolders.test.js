import { deco, logger }                       from '@spare/logger'
import { subFileInfos, subFiles, subFolders } from '../src/subElements'

const test = async () => {
  const SRC = 'packages/acq'
  await subFolders(SRC) |> deco |> logger
  await subFiles(SRC) |> deco |> logger
  await subFileInfos(SRC) |> deco |> logger
}

test()