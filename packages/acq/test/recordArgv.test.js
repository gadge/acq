import { delogger }                  from '@spare/deco'
import { decoRequest, decoResponse } from '../utils/customDeco'

const URL = 'https://www.google.com'
decoRequest({
  title: 'main',
  url: URL,
  params: { foo: 'a', bar: 'b' },
  args: undefined,
  configs: { a: 1, b: 2 }
}) |> delogger

decoResponse({
  title: 'main',
  url: URL,
  params: { foo: 'a', bar: 'b' },
  response: {
    status: 200,
    statusText: '<html></html>'
  }
}) |> delogger
