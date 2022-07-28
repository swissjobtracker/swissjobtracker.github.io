import cantons from '../util/cantons'
import { formatDate } from '../util/dates'

/**
 * Transform api timeseries data to echarts map input at time t
 * @param {tsdata} data
 * @param {string} t
 * @returns [{ name: 'XX', value: yy }, ...] for all cantons
 */
export const tsToMap = (data, t) => {
  if(t === null) {
    const dates = Object.entries(data)
                        .map(([_, ts]) => (new Date(ts[ts.length - 1].date)))
    t = Math.max(...dates)
  }

  const date = formatDate(t)
  // keys are identical up to canton chunk so sorting by the whole key effectively means sorting by canton
  // e.g. ch.kof.jobtracker.canton...
  const tsKeys = Object.keys(data).sort()
  return cantons.map((c, i) => ({
    name: c.value.toUpperCase(),
    // TODO: Do better e.g. handle date not in array
    value: data[tsKeys[i]].filter((x) => x.date == date)[0].value
  }))
}

/**
 * Transforms api timeseries data to echarts line chart format
 * @param {tsdata} data
 * @returns
 */
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

  const values =  Object.entries(data_obj).sort((a, b) => a[0] > b[0] ? 1 : -1).map(([d, v]) => [d, ...v])
  return [['date', ...keys], ...values]
}

export default {
  tsToMap,
  tsToLine
}
