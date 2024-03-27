require('dotenv').config()

const PORT = process.env.PORT || 3001
const SECRET = process.env.SECRET
const MONGODB_URI = process.env.MONGODB_URI
// Drinks from last 12 hours are taken into account
const DRINK_TIME_LIMIT = 12

module.exports = {
  PORT,
  SECRET,
  MONGODB_URI,
  DRINK_TIME_LIMIT
}
