import * as d from 'debug'
import { ts } from '../api'
import { getKeys } from '../util/keys'
import { tsToMap, tsToLine } from './tsutils'

const debug = d('dashboard:backend_ts')

let cache = {}

const getTimeseries = (cantons, indicators) => {
  const keys = getKeys(cantons, indicators)
  debug('getting keys: %o', keys)
  const cached = Object.keys(cache)
  const missing = keys.filter((k) => cached.indexOf(k) < 0)
  if(missing.length > 0) {
    debug('missed cache on %o', missing)
    ts.getTimeseries(missing)
      .then((ts) => {
        debug('api returned data')
        cache = Object.assign(cache, ts)
        return getSeriesFromCache(keys)
      })
  } else {
    debug('all in cache, lucky me!')
    return getSeriesFromCache(keys)
  }
}

const getSeriesFromCache = (keys) => {
  const series = keys.map((k) => cached[k])
  return new Promise((res, rej) => res(series))
}

/**
 *
 * @param {text} indicator the indicator for which to get data
 * @param {Date} t the time at which to get data
 * @returns [{name: '2 letter canton', value: 123}, ...]
 */
export const getMapSeries = (indicator, t) => {
  return getTimeseries(cantons, indicator)
          .then((data) => tsToMap(data, t))
}

export const getLineSeries = (cantons, indicators) => {
  return getTimeseries(cantons, indicators)
          .then(tsToLine)
}

export default {
  getMapSeries,
  getLineSeries
}