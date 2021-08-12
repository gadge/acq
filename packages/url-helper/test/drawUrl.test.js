import { decoString, says } from '@spare/logger'
import { drawUrl }          from '../src/drawUrl'

export const candidates = {
  alpha: { base: 'baidu.com', params: { apikey: 'demo', format: 'json' } },
  beta: {
    base: 'baidu.com',
    params: { apikey: 'demo', format: 'json' },
    rest: { protocol: 'https', port: '80', path: 'main.html' }
  },
  gamma: {
    base: 'baidu.com',
    params: { apikey: 'demo', format: 'json' },
    rest: { protocol: 'https', port: '80', path: [ 1, 3, 60 ] }
  }
}

for (const [ key, { base, params, rest } ] of Object.entries(candidates)) {
  drawUrl.call(null, base, params, rest,) |> decoString |> says[key]
}


