import { deco, logger, logNeL } from 'xbrief'
import { Environ } from '../index'

// 'device' |> logger
// Environ.deviceInfo() |> (_ => deco(_, { vu: 2 })) |> logNeL
'load info' |> logger
Environ.loadInfo() |> (_ => deco(_, { vu: 1 })) |> logNeL
'ip' |> logger
Environ.ipInfo() |> (_ => deco(_, { vu: 2 })) |> logNeL
