const getSingleKey = (series) => {
    return `ch.kof.x28.stuff.${series.by.value}.${series.byvalue.value}.${series.type.value}`
}

export const getKeys = (series) => {
  if(!Array.isArray(series)) {
    series = [series]
  }

  return series.map((s) => getSingleKey(s))
}

export default {
  getSingleKey,
  getKeys
}
