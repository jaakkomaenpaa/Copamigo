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

usersRouter.get('/:id/requests', async (req, res) => {
  const user = await User.findById(req.params.id).populate(
    'friendRequestsReceived'
  )
  res.json(user)
})

usersRouter.get('/:id/friends-promilles', async (req, res) => {
  const user = await User.findById(req.params.id).populate('friends')
  const friends = user.friends.map(friend => ({
    id: friend._id.toString(),
    username: friend.username,
    promilles: countPromilles(friend),
  }))
  res.json(friends)
})

usersRouter.get('/:id/promilles', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json({
    id: user._id.toString(),
    username: user.username,
    promilles: countPromilles(user),
  })
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
    console.log(error)
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
  if (decodedToken.id !== req.params.id) {
    return res.status(401).json({ error: 'Cannot update other users' })
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, userObject, {
    new: true,
  })
  res.json(updatedUser)
})

// Add a drink for user
usersRouter.put('/:id/drinks', async (req, res) => {
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }
  if (decodedToken.id !== req.params.id) {
    return res.status(401).json({ error: 'Cannot add drinks to other users' })
  }

  const newDrink = {
    ...req.body,
    size: req.body.size / 100, // Convert to litres from cl
    timestamp: new Date().toISOString(),
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $push: { drinksConsumed: newDrink } },
    { new: true }
  )

  res.json(updatedUser)
})

// Add a friend to user with :id
usersRouter.put('/:id/friends', async (req, res) => {
  const token = req.token
  const userId = req.params.id

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }
  if (decodedToken.id !== userId) {
    return res.status(401).json({ error: 'Cannot add friends for other users' })
  }

  const friendId = req.body.friendId
  const friendToAdd = await User.findById(friendId)

  // If friend already has added this user
  if (friendToAdd.friendRequestsSent.some(id => id.toString() === userId)) {
    // Update friend
    await User.findByIdAndUpdate(friendId, {
      $pull: { friendRequestsSent: userId },
    })
    await User.findByIdAndUpdate(friendId, { $push: { friends: userId } })
    // Update user
    await User.findByIdAndUpdate(userId, {
      $pull: { friendRequestsReceived: friendId },
    })
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true }
    )
    return res.json(updatedUser)
  }
  // If friend has not added this user yet

  // Update requested friend
  await User.findByIdAndUpdate(friendId, {
    $push: { friendRequestsReceived: userId },
  })
  // Update user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $push: { friendRequestsSent: friendId } },
    { new: true }
  )

  return res.json(updatedUser)
})

// Decline a friend request
usersRouter.put('/:id/decline-request', async (req, res) => {
  const friendId = req.body.friendId
  const userId = req.params.id
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' })
  }
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'Token invalid' })
  }
  if (decodedToken.id !== userId) {
    return res.status(401).json({ error: 'Cannot add friends for other users' })
  }
  // Handle declined friend
  await User.findByIdAndUpdate(friendId, {
    $pull: { friendRequestsSent: userId },
  })
  // Handle user
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $pull: { friendRequestsReceived: friendId } },
    { new: true }
  )

  return res.json(updatedUser)
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
