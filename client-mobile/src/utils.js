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
