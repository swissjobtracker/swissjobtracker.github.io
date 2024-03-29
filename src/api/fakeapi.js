import { formatDate } from "../util/dates";

/**
 * Some nice generator functions for test data
 */
const generators = [
  (i, max) => 10 * (i / max),
  (i, max) => 10 * Math.sin(4 * Math.PI * (i / max)),
  (i, max) => 10 * ((((2 * i) / max) * 100) % 1),
  (i, max) => 10 * Math.cos(4 * Math.PI * (i / max)),
  (i, max) => 7, // hello, Dilbert
  (i, max) => 10 * (1 - i / max),
  (i, max) => 10 * Math.random(),
  (i, max) => 10 * Math.sin(Math.PI * (i / max)),
];

// spot the StackOverflow c&p ;P
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 *
 * @param {strig[]} keys ts keys to load
 * @param {integer} n number of observations per series
 * @param {boolean} seq if seq == true, returned series will be sequences of 0:(n-1),
 *                      otherwise they are generated from a randomly chosen generator
 * @returns timeseries data equivalent to timeseriesdb-api's json format
 *          all series have the same length and start at 2021-01-01 with weekly frequency
 */
export const getFakeData = (keys, n, seq = false) => {
  const d0 = new Date("2021-01-01");
  const dates = new Array(n).fill(0).map((x, i) => {
    let d = new Date(d0);
    d.setDate(d.getDate() + 7 * i);
    return d;
  });
  const genI = new Array(keys.length)
    .fill(0)
    .map((x, i) => Math.floor(Math.random() * generators.length));
  shuffleArray(genI);
  const gens = genI.map((x) => (seq ? (i, n) => i : generators[x]));
  return Object.fromEntries(
    keys.map((k, j) => [
      k,
      new Array(n).fill(0).map((x, i) => {
        return {
          date: formatDate(dates[i]),
          value: gens[j](i, n),
        };
      }),
    ]),
  );
};

/**
 * Fakes a timeseriesdb-api call
 * @param {string[]} keys
 *
 * @returns
 */
const getTimeseries = (keys) =>
  new Promise((resolve, reject) => resolve(getFakeData(keys, 123)));

export default {
  getTimeseries,
};
