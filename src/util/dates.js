export const formatDate = (x) => {
  const d = new Date(x)
  const m = d.getMonth() + 1
  const D = d.getDate()
  return `${d.getFullYear()}-${(m < 10 ? '0' : '') + m}-${(D < 10 ? '0' : '') + D}`
}

export default {
  formatDate
}
