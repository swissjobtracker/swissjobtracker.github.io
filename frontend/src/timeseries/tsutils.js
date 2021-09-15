import cantons from '../util/cantons'
import { formatDate } from '../util/dates'

export const tsToMap = (data, t) => {
  const date = formatDate(t)
  const tsKeys = Object.keys(data).sort() // kinda assuming that everything before canton is constant...
  return cantons.map((c, i) => ({
    name: c.toUpperCase(),
    // TODO: Do better e.g. handle date not in array
    value: data[tsKeys[i]].filter((x) => x.date == date)[0].value
  }))
}

export const tsToLine = (data) => {
  const keys = Object.keys(data)
  const nSeries = keys.length
  let dates = new Set()
  for(const [key, value] of Object.entries(data)) {
    value.map(({ date }) => date).forEach(dates.add, dates)
  }

  let data_obj = {};
  dates.forEach((dat) => {
      data_obj[dat] = new Array(nSeries).fill(null);
  })

  for(const i in keys) {
    data[keys[i]].forEach(({ date, value }) => data_obj[date][i] = value)
  }

  return Object.entries(data_obj).sort((a, b) => a[0] > b[0] ? 1 : -1).map(([d, v]) => [d, ...v])
}

export default {
  tsToMap,
  tsToLine
}
