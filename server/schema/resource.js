import mongoose from 'mongoose'

// create a user schema

const resourceSchema = new mongoose.Schema(
  {
    resId: {
      type: String,
      required: true,
    },
    title:{
      type: String,
      required: true,
      unique: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        default: '',

    },
    difficulty: {
        type: Number,
        default: 0,
    },
    contentType: {
        type: String,
      required: true,
  },
  notes: {  
    type: String,
    default: '',

  },
rating: {
    type: Number,
    default: 0,
},

  review:{
    type: String,
    default: '',
  },

  complete:{
    type: Boolean,
    default: false,
  },
  link:{
    type: String,
    default: '',
  }
  },
  {
    autoIndex: true,
  }
)


const resModel = mongoose.model('Resource', resourceSchema)
export default resModel
