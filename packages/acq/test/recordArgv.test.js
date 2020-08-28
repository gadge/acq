import { delogger } from '@spare/deco'
import { reqArgv, respArgv } from '../utils/argv'

reqArgv('main', { foo: 'a', bar: 'b' }, 256, { a: 1, b: 2 }) |> delogger

respArgv('main', 'https://www.google.com', { foo: 'a', bar: 'b' }, {
  status: 200,
  statusText: '<html></html>'
}) |> delogger
