import NewsletterClient from '../models/newletterClient.js'

export const add = async ({ email, age, workDepartment }) => {
  return await NewsletterClient.create({ email, age, workDepartment })
}

export const getAll = async () => {
  return await NewsletterClient.find({})
}

export const remove = async (email) => {
  return await NewsletterClient.deleteMany({ email })
}

export default {
  add,
  getAll,
  remove,
}
