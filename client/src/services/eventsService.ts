import { parseDateFromDDMMYYYY } from 'func/parseDateFromDDMMYYYY'
import { EventProps } from 'types/event'
import contentful from 'utils/contentful'

export const getAll = async () => {
  const events = await contentful.getEntries({
    content_type: 'oooEvent',
  })

  return events.items.map((item) => {
    //eslint-disable-next-line
    const image: any = item.fields.image

    return {
      ...item.fields,
      image: 'https:' + image.fields.file.url,
    } as EventProps
  })
}

export const getBySlug = async (slug: string) => {
  const events = await contentful.getEntries({
    content_type: 'oooEvent',
    'fields.slug': slug,
  })

  const response = events.items.map((item) => {
    //eslint-disable-next-line
    const image: any = item.fields.image

    return {
      ...item.fields,
      image: 'https:' + image.fields.file.url,
    } as EventProps
  })

  return response[0]
}

export const getUpcoming = async () => {
  const events = await contentful.getEntries({
    content_type: 'oooEvent',
  })

  events.items = events.items.filter((item) => {
    const now = new Date()
    now.setDate(now.getDate() - 1)

    const eventDate = parseDateFromDDMMYYYY(item.fields.date as string)

    if (now < eventDate) return true

    return false
  })

  events.items.sort((a, b) => {
    const aEventDate = parseDateFromDDMMYYYY(a.fields.date as string)
    const bEventDate = parseDateFromDDMMYYYY(b.fields.date as string)

    return aEventDate.getTime() - bEventDate.getTime()
  })

  return events.items.map((item) => {
    //eslint-disable-next-line
    const image: any = item.fields.image

    return {
      ...item.fields,
      image: 'https:' + image.fields.file.url,
    } as EventProps
  })
}

export default {
  getAll,
  getUpcoming,
  getBySlug,
}
