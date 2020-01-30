export const rgDash = /-/g
export const toDate = (y4md) => y4md ? new Date(y4md) : undefined
export const belongTo = (dt, { start, end }) => start <= dt && dt <= end
export const belongToRange = (dt, [start, end]) => start <= dt && dt <= end
export const daysMove = (date, days) => {
  date.setDate(date.getDate() + days)
  return date
}
