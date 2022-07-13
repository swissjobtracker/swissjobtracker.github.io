const getSingleKey = (series, indicator) => {
    return `ch.kof.x28.stuff.${series.type}.${series.id}.${indicator}`
}

export const getKeys = (series, indicators) => {
  if(!Array.isArray(series)) {
    series = [series]
  }
  if(!Array.isArray(indicators)) {
    indicators = [indicators]
  }

  return (series.map((s) => indicators.map((i) => getSingleKey(s, i)))).flat()
}

export default {
  getSingleKey,
  getKeys
}
