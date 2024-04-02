export const isValidDate = dateObject => {
  const { day, month, year } = dateObject
  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === parseInt(year) &&
    date.getMonth() === parseInt(month) - 1 &&
    date.getDate() === parseInt(day)
  )
}

export const isValidAge = dateObject => {
  const dateOfBirth = getDateFromObject(dateObject)
  const currentDate = new Date()
  const ageInMs = currentDate - dateOfBirth
  const age = ageInMs / (1000 * 60 * 60 * 24 * 365.25)
  return age >= 18 && age <= 100
}

export const getDateFromObject = dateObject => {
  const { day, month, year } = dateObject
  return new Date(year, month - 1, day)
}

export const getPromilleColor = promilles => {
  if (promilles < 0.5) {
    return { backgroundColor: 'green' }
  } else if (promilles > 0.5 && promilles < 1) {
    return { backgroundColor: 'lightgreen' }
  } else if (promilles > 1 && promilles < 1.7) {
    return { backgroundColor: 'yellow' }
  } else if (promilles > 1.7 && promilles < 2.8) {
    return { backgroundColor: 'orange' }
  } else if (promilles > 2.8) {
    return { backgroundColor: 'red' }
  }
}

// To be completed
export const getPromilleEmoji = promilles => {
  if (promilles < 0.5) {
    return
  } else if (promilles > 0.5 && promilles < 1) {
    return
  } else if (promilles > 1 && promilles < 1.7) {
    return
  } else if (promilles > 1.7 && promilles < 2.8) {
    return
  } else if (promilles > 2.8) {
    return '💀'
  }
}
