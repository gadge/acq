import { pageToSamples } from '@puppeteer-terrain/china-local-gov-annual-report'
import { delogger }      from '@spare/deco'
import { Chrome }        from '../src/Chrome'

const test = async () => {
  const result = await Chrome.parallelOpenPages({
      urls: [
        'https://en.wikiquote.org/wiki/Paul_Krugman',
        'https://en.wikiquote.org/wiki/Franco_Modigliani',
        'https://en.wikiquote.org/wiki/James_Tobin',
        'https://en.wikiquote.org/wiki/Thomas_J._Sargent',
        'https://en.wikiquote.org/wiki/Henry_Ford',
        'https://en.wikiquote.org/wiki/Tom_Ford',
      ],
      selector: pageToSamples,
      max: 4
    },
  )
  result |> delogger
}

test()