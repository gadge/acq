import { deca, logger } from '@spare/logger'
import os               from 'os'

export class OsNetworkInterfaceTest {
  static test() {
    os.networkInterfaces() |> deca({ vo: 3 }) |> logger
  }
}

OsNetworkInterfaceTest.test()