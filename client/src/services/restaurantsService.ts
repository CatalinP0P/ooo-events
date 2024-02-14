import { RestaurantProps } from 'types/restaurant'
import contentful from 'utils/contentful'

export const getAll = async () => {
  const restaurants = await contentful.getEntries({
    content_type: 'oooRestaurant',
  })

  return restaurants.items.map((item) => {
    //eslint-disable-next-line
    const image: any = item.fields.image

    //eslint-disable-next-line
    const menu: any = item.fields.menu
    //eslint-disable-next-line
    let props: any = {}

    if (menu) {
      props = { menu: 'https:' + menu.fields.file.url }
    }
    return {
      ...item.fields,
      image: 'https:' + image.fields.file.url,
      ...props,
    } as RestaurantProps
  })
}

export const getBySlug = async (slug: string) => {
  const restaurants = await contentful.getEntries({
    content_type: 'oooRestaurant',
    'fields.slug': slug,
  })

  const restaurant = restaurants.items.map((item) => {
    //eslint-disable-next-line
    const image: any = item.fields.image

    //eslint-disable-next-line
    const menu: any = item.fields.menu
    //eslint-disable-next-line
    let props: any = {}

    if (menu) {
      props = { menu: 'https:' + menu.fields.file.url }
    }
    return {
      ...item.fields,
      image: 'https:' + image.fields.file.url,
      ...props,
    } as RestaurantProps
  })[0]

  return restaurant
}

export default {
  getAll,
  getBySlug,
}
