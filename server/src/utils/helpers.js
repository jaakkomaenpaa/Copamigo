const config = require('./config')

// Calculations will be improved to take time into account more
const countPromilles = (user) => {
  const drinksToCount = filterDrinks(user.drinksConsumed)

  let alcoholInGrams = 0
  drinksToCount.forEach((drink) => {
    // (Alc% * Volume(l) * 1000) / 100 * Density of ethanol
    alcoholInGrams += ((drink.alcVol * drink.size * 1000) / 100) * 0.789
  })

  const volumeOfDistribution = getVolumeOfDistribution(user)
  const eliminationRate = user.gender === 'male' ? 0.148 : 0.156

  const earliestDrink = drinksToCount.sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  )[0]

  const lengthOfDrinking = earliestDrink
    ? (new Date() - new Date(earliestDrink.timestamp)) / (1000 * 60 * 60)
    : 0

  const promilles =
    alcoholInGrams / volumeOfDistribution - eliminationRate * lengthOfDrinking
  // Sometimes the formula gives a negative number so we don't want to return that
  return promilles > 0 ? parseFloat(promilles.toFixed(2)) : 0.0
}

const filterDrinks = (drinksConsumed) => {
  // Only take into account drinks from specified time window
  const timeLimit = new Date()
  timeLimit.setHours(timeLimit.getHours() - config.DRINK_TIME_LIMIT)

  return drinksConsumed.filter(
    (drink) => drink.timestamp > timeLimit.toISOString()
  )
}

// Uses calculation method 2 (note for self)
const getVolumeOfDistribution = (user) => {
  const coefficient1 = user.gender === 'male' ? 0.6 : 0.5
  const totalBodyWater = user.weight * coefficient1

  const coefficient2 = user.gender === 'male' ? 0.825 : 0.838
  return totalBodyWater / coefficient2
}

module.exports = {
  countPromilles,
}
