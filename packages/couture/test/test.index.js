import { ReT } from '@acq/enum-ret'
import { Couture } from '..'

class CoutureTest {
  static test () {
    const samples = [
      { date: '2020-01-20', case: 278, death: 6 },
      { date: '2020-01-21', case: 326, death: 6 },
      { date: '2020-01-22', case: 547, death: 17 },
      { date: '2020-01-23', case: 639, death: 25 },
      { date: '2020-01-24', case: 916, death: 41 },
      { date: '2020-01-25', case: 2000, death: 55 },
      { date: '2020-01-26', case: 2700, death: 56 },
      { date: '2020-01-27', case: 4400, death: 82 },
      { date: '2020-01-28', case: 5970, death: 106 },
      { date: '2020-01-29', case: 7678, death: 133 },
      { date: '2020-01-30', case: 8124, death: 170 },
    ]
    Couture.fromSamples(samples, { to: ReT.table }) |> console.log
  }
}

CoutureTest.test()
