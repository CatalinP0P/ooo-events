import mongoose from '../utils/mongoose.js'

const newsletterTemplate = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
})

const NewsletterTemplate = mongoose.model(
  'newsletterTemplate',
  newsletterTemplate,
)

export default NewsletterTemplate
