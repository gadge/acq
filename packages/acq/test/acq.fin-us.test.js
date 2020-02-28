import { SAMPLES, ANSI, TABLE } from '@analys/enum-tabular-types'
import { Acq } from '../src/Acq'
import { delogger } from '@spare/deco'
import { deco, decoTable, decoVector, logger, says } from '@spare/logger'
import { matchSlice } from '@analys/table-init'

const USTechs = ['AAPL', 'MSFT', 'FB', 'GOOG', 'AMZN', 'NVDA', 'AMD', 'CRM', 'QCOM', 'TSM', 'INTC']
const CNConcepts = ['BABA', 'NTES', 'JD', 'BIDU', 'PDD', 'EDU', 'TME', 'IQ', 'YUMC', 'LK', 'BILI']

class AcqFinUsTest {
  static async test () {
    await Acq.port(
      {
        title: 'profiles',
        url: 'http://localhost:2080/table?format=samples',
        prep: o => o,
      },
      { from: SAMPLES, to: TABLE }
    ).then(result => {
      result |> decoTable |> says['result']
    })
  }
}

AcqFinUsTest.test()


