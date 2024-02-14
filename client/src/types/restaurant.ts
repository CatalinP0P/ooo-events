export interface RestaurantProps {
  slug: string
  name: string
  location: string
  //eslint-disable-next-line
  description: any
  openHour: string
  closeHour: string
  image: string
  menu: string
  minimumSpending?: number
  address: string
  postcode: string
}
