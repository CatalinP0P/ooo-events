export interface ClubProps {
  name: string
  monday: boolean
  tuesday: boolean
  wednesday: boolean
  thrusday: boolean
  friday: boolean
  saturday: boolean
  sunday: boolean
  location: string
  openHour?: string
  closeHour?: string
  //eslint-disable-next-line
  description: any
  image: string
  rulesAndRegulations?: string
  floorPlan?: string
  menu?: string
  minimumSpending?: number
  address: string
  postcode: string
}
