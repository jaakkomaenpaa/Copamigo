const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { countPromilles } = require('./../utils/helpers')

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const user = new User({
    ...req.body,
    passwordHash: passwordHash,
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(403).json(error.message)
  }
})

usersRouter.put('/:id', async (req, res) => {
  const userObject = req.body
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, userObject)
  res.json(updatedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  const token = req.token
  const user = req.user

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }

  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }

  const userToDelete = await User.findById(req.params.id)
  if (userToDelete.id === user.id) {
    await User.findByIdAndDelete(req.params.id)
  } else {
    res.status(401).json({ error: "Cannot delete other users' accounts" })
  }
  res.status(204).end()
})

module.exports = usersRouter
