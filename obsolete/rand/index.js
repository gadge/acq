import { Zu } from 'borel'

const rank = 12
const randLowerBound = Math.pow(10, rank)
const randUpperBound = Math.pow(10, rank + 1)
export const localRand = () => {
  return Zu.rand(randLowerBound, randUpperBound)
}
