const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()

const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!user || !passwordCorrect) {
    return res.status(401).json({
      error: 'Invalid username or password',
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // Token to verify user actions in app
  const token = jwt.sign(userForToken, config.SECRET)

  res.status(200).send({
    token,
    username: user.username,
    id: user.id,
  })
})

module.exports = loginRouter
