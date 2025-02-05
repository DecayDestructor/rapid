import express from 'express'
import UserModel from '../schema/user.js'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

//route to get a user by emailid

router.get('/:email', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.params.email })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//route to create a user

router.post('/create', async (req, res) => {
  const { name, email, password } = req.body
  //generate a unique id
  const id = uuidv4()
  try {
    const newUser = new UserModel({ name, email, password, id })
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((val) => val.message)
      return res.status(400).json({ errors })
    } else {
      res.status(500).json({ message: error.message })
    }
  }
})
export default router
