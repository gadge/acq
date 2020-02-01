import os from 'os'
import { deco, logger } from 'xbrief'

export class OsNetworkInterfaceTest {
  static test () {
    os.networkInterfaces() |> (_ => deco(_, { vu: 3 })) |> logger
  }
}

OsNetworkInterfaceTest.test()
