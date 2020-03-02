import { SAMPLES, ANSI, TABLE } from '@analys/enum-tabular-types'
import { Acq } from '../src/Acq'
import { delogger } from '@spare/deco'
import { deco, decoTable, decoVector, logger, says } from '@spare/logger'
import { matchSlice } from '@analys/table-init'

const USTechs = ['AAPL', 'MSFT', 'FB', 'GOOG', 'AMZN', 'NVDA', 'AMD', 'CRM', 'QCOM', 'TSM', 'INTC']
const CNConcepts = ['BABA', 'NTES', 'JD', 'BIDU', 'PDD', 'EDU', 'TME', 'IQ', 'YUMC', 'LK', 'BILI']

const [from, to] = [
  TABLE,
  SAMPLES
]
const format = from === SAMPLES ? 'samples' : 'table'

class AcqFinUsTest {
  static async test () {
    await Acq.tabular(
      {
        title: 'profiles',
        url: `http://localhost:2080/foba/${format}`,
        params: { ansi: false },
        prep: o => o,
        from,
        to
      }
    ).then(result => {
      if (to === TABLE) result |> decoTable |> says['result in table']
      if (to === SAMPLES) result |> deco |> says['result in samples']
    })
  }
}

AcqFinUsTest.test()


