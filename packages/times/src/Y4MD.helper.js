import { Y4MD } from 'elprimero'

const { fromTx, belongTo: _belongTo } = Y4MD

export const toY4MD = (tx) => fromTx(tx)
export const belongTo = (tx, start, end) => _belongTo(fromTx(tx), start, end)
