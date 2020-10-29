const general_briefs = [
  [/ {2}/g, ' '],
  [/total/gi, 't'],
  [/other/gi, 'o'],
  [/from/gi, 'fr'],
  [/business/gi, 'b '],
  [/\band\b/gi, '&'],
  [/ & /gi, '&'],
  [/([ \-])term/gi, ' tm'],
  [/non([ \-])/gi, 'n-'],
  [/weighted([ \-])/gi, 'w '],
  [/average/gi, 'avg'],
  [/current/gi, 'cur'],
  [/asset(s?)/gi, 'ast'],
  [/income/gi, 'inc'],
  [/revenue/gi, 'rev'],
  [/purchase/gi, 'purc'],
  [/profit/gi, 'pft'],
  [/payment(s?)/gi, 'pm'],
  [/expens(es?)/gi, 'exp'],
  [/payable(s?)/gi, 'pyb'],
  [/financ(e|ial|ing)/gi, 'fin'],
  [/acquisition(s?)/gi, 'acq'],
  [/capital/gi, 'cap'],
  [/reserve/gi, 'rsv'],
  [/inventor(y|ies)/gi, 'invt'],
  [/invest(ing|ment(s?))/gi, 'iv'],
  [/interest(s?)/gi, 'intr'],
  [/insurance/gi, 'insr'],
  [/goodwill/gi, 'gdw'],
  [/intangible/gi, 'intg'],
  [/expenditure(s?)/gi, 'expd'],
  [/management/gi, 'mang'],
  [/dividend/gi, 'div'],
  [/deposit(s?)/gi, 'dps'],
  [/operating/gi, 'op'],
  [/receiv(ed|able(s?))/gi, 'recv'],
  [/liabilities/gi, 'liab'],
  [/estimated/gi, 'est'],
  [/unamortized/gi, 'un-amort'],
  [/due within one year/gi, 'dw1y'],
  [/attributable to/gi, 'attr '],
  [/cash (and|&) cash equivalents/gi, 'cce'],
]

const balance_briefs = [
  [/monetary/gi, 'monet'],
  [/development/gi, 'dev'],
  [/shareholders('?) equity/gi, 'eqt'],
  [/property, plant (&|and) equipment/gi, 'ppe']
]

const income_briefs = [
  [/margin/gi, 'mrg'],
  [/earnings before/gi, 'eb'],
  [/earnings per share/gi, 'eps']
]

const cashflow_briefs = [
  [/depreciation/gi, 'deprec'],
  [/cash flow/gi, 'c flow'],
  [/subtotal of cash inflow from/gi, 't cash-in'],
  [/subtotal of cash outflow from/gi, 't cash-out'],
  [/increase (in|of)/gi, 'incr'],
  [/decrease (in|of)/gi, 'decr'],
  [/equivalents/gi, 'eqv'],
  [/amortization/gi, 'amort'],
  [/activities/gi, '']
]

const basic_briefs = [
  [/basic/gi, ''],
  [/cash flow/gi, 'c flow'],
  [/equity/gi, 'eqt'],
  [/activities/gi, ''],
  [/return on/gi, 'ro']
]

const enterpriseValues_briefs = [
  [/market /gi, 'mkt'],
  [/capitalization/gi, 'cap'],
  [/stock price/gi, 'prc'],
  [/number of /gi, '#'],
  [/value/gi, 'val'],
  [/enterprise/gi, 'ent']
]

export const enAbrFin = {
  general: general_briefs,
  balance: balance_briefs,
  income: income_briefs,
  cashflow: cashflow_briefs,
  basic: basic_briefs,
  enterpriseValues: enterpriseValues_briefs
}
