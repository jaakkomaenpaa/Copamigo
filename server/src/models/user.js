const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  dateOfBirth: {
    type: String,
    required: true
  },
  height: {
    type: Number,   // cm
    required: true
  },
  weight: { 
    type: Number,   // kg
    required: true
  },
  drinksConsumed: [{
      size: {
        type: Number,
        required: true
      },
      alcVol: {
        type: Number,
        required: true
      },
      timestamp: {
        type: String,
        required: true
      }
  }],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
