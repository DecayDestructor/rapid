import mongoose from 'mongoose'

// create a user schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    autoIndex: true,
  }
)

const UserModel = mongoose.model('User', userSchema)
export default UserModel
