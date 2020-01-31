import { SAMPLES, ANSI } from '@acq/enum-ret'
import { Acq } from '../src/Acq'
import { TableX } from 'xbrief'

class AcqTest {
  static async test () {
    await Acq.port(
      { title: 'nCoV', url: 'http://localhost:2080/samples', loc: x => x, },
      { from: SAMPLES, to: ANSI }
    ).then(result => result |> console.log)
  }
}

AcqTest.test()


