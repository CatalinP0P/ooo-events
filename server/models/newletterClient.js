import mongoose from '../utils/mongoose.js'

const newsletterClientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  age: {
    type: Number,
    required: true,
  },
  workDepartment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const NewsletterClient = mongoose.model(
  'NewsletterClient',
  newsletterClientSchema,
)

export default NewsletterClient
