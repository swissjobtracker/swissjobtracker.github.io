const getSingleKey = (series) => {
    return `ch.kof.x28.stuff.${series.by}.${series.byvalue}.${series.type}`
}

export const getKeys = (series) => {
  if(!Array.isArray(series)) {
    series = [series]
  }

  return (series.map((s) => getSingleKey(s))).flat()
}

export default {
  getSingleKey,
  getKeys
}
