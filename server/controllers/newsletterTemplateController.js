import NewsletterTemplate from '../models/newsletterTemplate.js'

export const get = async () => {
  return await NewsletterTemplate.findOne({})
}

export const edit = async (fields) => {
  const oldTemplate = await get()
  if (oldTemplate == null) return await NewsletterTemplate.create({ ...fields })

  return await NewsletterTemplate.updateOne(
    { title: oldTemplate.title },
    { $set: { ...fields } },
  )
}

export default { get, edit }
