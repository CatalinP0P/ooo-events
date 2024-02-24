import NewsletterClient from '../models/newletterClient.js'

export const add = async ({ email, age, workDepartment }) => {
  return await NewsletterClient.create({ email, age, workDepartment })
}

export default {
  add,
}
