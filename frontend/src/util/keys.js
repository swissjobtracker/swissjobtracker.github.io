const getSingleKey = (canton, indicator) => `ch.kof.x28.stuff.${canton}.${indicator}`

export const getKeys = (cantons, indicators) => {
  if(!Array.isArray(cantons)) {
    cantons = [cantons]
  }
  if(!Array.isArray(indicators)) {
    indicators = [indicators]
  }

  return (cantons.map((c) => indicators.map((i) => getSingleKey(c, i)))).flat()
}

export default {
  getSingleKey,
  getKeys
}
