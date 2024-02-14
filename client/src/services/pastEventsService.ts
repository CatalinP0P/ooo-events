import { parseDateFromDDMMYYYY } from 'func/parseDateFromDDMMYYYY'
import { EventProps } from 'types/event'
import contentful from 'utils/contentful'

export const getAll = async () => {
  const pastEvents = await contentful.getEntries({
    content_type: 'oooPastEvents',
  })

  pastEvents.items.sort((a, b) => {
    const aDate = parseDateFromDDMMYYYY(a.fields.date as string)
    const bDate = parseDateFromDDMMYYYY(b.fields.date as string)

    return aDate.getDate() - bDate.getDate()
  })

  return pastEvents.items.map((item) => {
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
}
