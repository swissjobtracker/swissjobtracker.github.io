import d from "debug";
import ts from "../api";
import cantons from "../util/cantons";
import { getKeys } from "../util/keys";
import { tsToMap, tsToLine } from "./tsutils";

const debug = d("dashboard:backend_ts");

let cache = {};

const getTimeseries = (series) => {
  const keys = getKeys(series);
  debug("getting keys: %o", keys);
  const cached = Object.keys(cache);
  const missing = keys.filter((k) => cached.indexOf(k) < 0);
  if (missing.length > 0) {
    debug("missed cache on %o", missing);
    return ts.getTimeseries(missing).then((ts) => {
      debug("api returned data");
      cache = Object.assign(cache, ts);
      return getSeriesFromCache(keys);
    });
  } else {
    debug("all in cache, lucky me!");
    return getSeriesFromCache(keys);
  }
};

const getSeriesFromCache = (keys) => {
  let series = {};
  keys.forEach((k) => (series[k] = cache[k]));
  return new Promise((res, rej) => res(series));
};

/**
 * Get Series for indicator of all Cantons
 * @param {text} indicator
 * @returns
 */
export const getCantonalSeries = (indicator) => {
  const series = cantons.map((c) => ({
    type: indicator,
    by: {
      label: "Canton",
      value: "canton",
    },
    byvalue: c,
  }));
  return getTimeseries(series);
};

/**
 *
 * @param {text} indicator the indicator for which to get data
 * @param {Date} t the time at which to get data
 * @returns [{name: '2 letter canton', value: 123}, ...]
 */
export const getMapSeries = (indicator, t = null) => {
  return getCantonalSeries(indicator).then((data) => tsToMap(data, t));
};

export const getLineSeries = (series) => {
  return getTimeseries(series).then(tsToLine);
};

export default {
  getMapSeries,
  getLineSeries,
  getCantonalSeries,
};
