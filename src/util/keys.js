const getSingleKey = (series) => {
  if(series.by.value == 'total') {
    return `ch.kof.jobtracker.total.${series.type.value}`.toLowerCase()
  } else {
    return `ch.kof.jobtracker.${series.by.value}.${series.byvalue.value}.${series.type.value}`.toLowerCase()
  }
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
