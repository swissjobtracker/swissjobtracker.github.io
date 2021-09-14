const generators = [
  (i, max) => 10*(i/max),
  (i, max) => 10*Math.sin(4*Math.PI*(i/max)),
  (i, max) => 10*((2*i/max)*100 % 1),
  (i, max) => 10*Math.cos(4*Math.PI*(i/max)),
  (i, max) => 7,
  (i, max) => 10*(1-i/max),
  (i, max) => 10*Math.random(),
  (i, max) => 10*Math.sin(Math.PI*(i/max))
]

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

const getFakeData = (keys, n) => {
  const ncol = keys.length
  const d0 = new Date("2021-01-01")
  dates = (new Array(n)).fill(0).map((x, i) => {
    let d = new Date(d0)
    d.setDate(d.getDate() + 7*i)
    return d
  })
  const genI = (new Array(generators.length)).fill(0).map((x, i) => i)
  shuffleArray(genI)
  const gens = genI.map((x) => generators[x])
  return (new Array(n)).fill(0).map((x, i) => {
    return [formatDate(dates[i]), ...(new Array(ncol)).fill(0).map((x, j) => gens[j](i, n))]
  })
}

const formatDate = (x) => {
  const d = new Date(x)
  const m = d.getMonth() + 1
  const D = d.getDate()
  return `${d.getFullYear()}-${(m < 10 ? '0' : '') + m}-${(D < 10 ? '0' : '') + D}`
}

const getTimeseries = (keys) => getFakeData(keys, 123)

export default {
  getTimeseries
}
