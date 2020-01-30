export const enAbrExchange = [
  [/open/gi, 'o'],
  [/high/gi, 'hi'],
  [/low/gi, 'lo'],
  [/close/gi, 'e'],
  [/volum([ne])/gi, 'vol'],
  [/average( ?)/gi, 'avg '],
  [/percent/gi, '%'],
  [/change/gi, 'ch'],
  [/price/gi, 'prc'],
  [/total /gi, 't '],
  [/market /gi, 'mkt'],
  [/turnover/gi, 'tnv'],
  [/in (\d*?) days/gi, (str, p1, offset, s) => `d(${p1})`]
]
  .sort(([a], [b]) => String(b).length - String(a).length)
