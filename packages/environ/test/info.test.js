import { deco, logger, logNeL } from 'xbrief'
import { Environ } from '..'

'device' |> logger
Environ.deviceInfo() |> (_ => deco(_, { vu: 2 })) |> logNeL
'load info' |> logger
Environ.loadInfo() |> deco |> logNeL
'ip' |> logger
Environ.ipInfo() |> deco |> logNeL
