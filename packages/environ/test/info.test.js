import { deco, logger, logNeL } from 'xbrief'
import { Environ } from '../index'

'device' |> logger
Environ.deviceInfo() |> (_ => deco(_, { vert: 2 })) |> logNeL
'load info' |> logger
Environ.loadInfo() |> (_ => deco(_, { vert: 1 })) |> logNeL
'ip' |> logger
Environ.ipInfo() |> (_ => deco(_, { vert: 2 })) |> logNeL
