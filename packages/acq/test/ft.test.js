// import { AxiosInstance as axios } from 'axios'
import axios from 'axios'
import { deco, logger } from 'xbrief'
import { Acq } from '../index'
import { SAMPLES } from '@acq/enum-ret'

class FtTest {
  static async testAxios () {
    await axios.post('http://api.ft.com/content/search/v1',
      {
        queryString: 'banks',
        resultContext: {
          aspects: ['title', 'lifecycle', 'location', 'summary', 'editorial']
        }
      },
      {
        headers: {
          'x-api-key': '59cbaf20e3e06d3565778e7bf1c4363c71e841e68b7373c941a2e631',
          'content-type': 'application/json'
        }
      })
      .then(result => {
        result |> deco |> console.log
        return result
      })
      // .then(({ data }) => {
      //   data |> deco |> console.log
      //   // console.log(response)
      // })
      .catch(error => {
        console.log(error)
      })
  }

  static async testAcq () {
    await Acq.port({
        url: 'http://api.ft.com/content/search/v1',
        data: {
          queryString: 'banks',
          resultContext: {
            aspects: ['title', 'lifecycle', 'location', 'summary', 'editorial']
          }
        },
        configs: {
          headers: {
            'x-api-key': '59cbaf20e3e06d3565778e7bf1c4363c71e841e68b7373c941a2e631',
            'content-type': 'application/json'
          }
        },
        loc: ({ results: [{ results: r }] }) => r,
      },
      { from: SAMPLES, method: 'post' }
    ).then(r => {
      r |> deco |> logger
    })
  }
}

// FtTest.testAxios()
FtTest.testAcq()




