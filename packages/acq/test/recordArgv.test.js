import { delogger } from '@spare/deco'
import { reqArgv }  from '../utils/argv'

reqArgv('main', ['foo', 'bar'], 256, { a: 1, b: 2 }) |> delogger
