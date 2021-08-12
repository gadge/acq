import { SAMPLES, TABLE }    from '@analys/enum-tabular-types'
import { Table }             from '@analys/table'
import { deco }              from '@spare/deco'
import { decoTable, logger } from '@spare/logger'
import { isNumeric }         from '@typen/num-strict'
import { pair }              from '@vect/object-init'
import { Acq }               from '../src/Acq'

export const BASE = 'http://api.worldbank.org/v2'

export const COUNTRIES = [ 'USA', 'CHN', 'JPN', 'ECS' ] // 'ECS': Europe & Central Asia
export const GDP = 'NY.GDP.MKTP.CD', POP = 'SP.POP.TOTL'
export const EMPLOY_TO_POP = 'SL.EMP.1524.SP.ZS' // unable to get the data
export const INDICATORS = [ GDP, POP ]
export const WITHIN_5_YEARS = [ 2015, 2020 ]


export const getIndicator = async function (
  {
    country = COUNTRIES,
    indicator = EMPLOY_TO_POP,
    year = WITHIN_5_YEARS,
    easy = false, spin = false
  } = {}
) {
  const countries = country
  const yearEntry = year
  const per_page = countries.length * ( yearEntry[1] - yearEntry[0] + 1 )
  const table = await Acq.tabular({
    title: indicator,
    url: `${ BASE }/country/${ countries.join(';') }/indicator/${ indicator }`,
    params: ( { date: yearEntry.join(':'), format: 'json', per_page: per_page } ),
    prep: ([ message, samples ]) => {
      // throw new Error('prep exception')
      return samples
    },
    from: SAMPLES,
    to: TABLE,
    easy,
    spin
  })
  return leanTable(table)
}


export const distinctIdValue = (idValueList) => {
  const o = {}
  for (let { id, value } of idValueList) o[id] = value
  return o
}

export const leanTable = table => {
  if (!table?.head?.length || !table?.rows?.length) return table
  table = Table.from(table)
  const [ { id: indicatorId, value: indicatorName } ] = table.column('indicator')
  const countries = table
    .select([ 'country', 'countryiso3code' ]).rows
    .map(([ { value }, iso ]) => ( { id: iso, value } ))
    |> distinctIdValue
  table = table
    .renameColumn('countryiso3code', 'iso')
    .renameColumn('value', indicatorId)
    .mutateColumn(indicatorId, x => isNumeric(x) ? parseInt(x) : x)
    .mutateColumn('indicator', ({ id }) => id)
  table.title = indicatorId ?? ''
  table.indicators = pair(indicatorId, indicatorName)
  table.countries = countries
  return table
}


const test = async () => {
  const table = await getIndicator({
      country: COUNTRIES,
      year: WITHIN_5_YEARS,
      indicator: GDP,
      format: TABLE,
      spin: true
    }
  )
  table |> deco |> logger
  table |> decoTable |> logger
}

test().then()
