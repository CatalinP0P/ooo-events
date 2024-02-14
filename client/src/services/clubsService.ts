import { ClubProps } from 'types/club'
import contentful from 'utils/contentful'

export const getAll = async () => {
  const clubs = await contentful.getEntries({
    content_type: 'oooClub',
  })

  return clubs.items.map((club) => {
    //eslint-disable-next-line
    const image: any = club.fields.image
    return {
      ...club.fields,
      image: image.fields.file.url,
    } as ClubProps
  })
}

const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
]

export const getOpenToday = async () => {
  const todayDay = daysOfWeek[new Date().getDay()]

  const varName = `fields.${todayDay}`
  const clubs = await contentful.getEntries({
    content_type: 'oooClub',
    [varName]: 1,
  })

  return clubs.items.map((club) => {
    //eslint-disable-next-line
    const image: any = club.fields.image
    return {
      ...club.fields,
      image: image.fields.file.url,
    } as ClubProps
  })
}

export const getByName = async (name: string) => {
  const clubs = await contentful.getEntries({
    content_type: 'oooClub',
    'fields.name': name,
  })

  return clubs.items.map((club) => {
    console.log(club)
    //eslint-disable-next-line
    const image: any = club.fields.image
    //eslint-disable-next-line
    const rules: any = club.fields.rulesAndRegulations
    //eslint-disable-next-line
    const floorPlan: any = club.fields.floorPlan
    //eslint-disable-next-line
    const menu: any = club.fields.menu

    //eslint-disable-next-line
    let props: any = { image: image.fields.file.url }

    if (rules) props = { ...props, rulesAndRegulations: rules.fields.file.url }

    if (floorPlan) props = { ...props, floorPlan: floorPlan.fields.file.url }

    if (menu) props = { ...props, menu: menu.fields.file.url }

    return {
      ...club.fields,
      image: image.fields.file.url,
      ...props,
    } as ClubProps
  })[0]
}

export default {
  getAll,
  getOpenToday,
  getByName,
}
