import { toast } from 'react-toastify'
import { ClubProps } from 'types/club'
import { EventProps } from 'types/event'
import { RestaurantProps } from 'types/restaurant'
import api from 'utils/api'

export interface reservationFormProps {
  male: number
  female: number
  spendingAmount: number | null
  date: Date
  name: ''
  email: ''
  phone: ''
  location: ClubProps | RestaurantProps
}

export const sendReservationForm = (data: reservationFormProps) => {
  return api.post('/forms/reserveTable', data)
}

export interface guestFormProps {
  male: number
  female: number
  date: string
  name: ''
  email: ''
  phone: ''
  club: ClubProps | EventProps
  age: number | undefined
  workDepartment: string
}

export const sendGuestListForm = (data: guestFormProps) => {
  return api.post('/forms/guestList', data)
}

interface specialRequestProps {
  restaurant: RestaurantProps
  name: string
  email: string
  details: string
  interest: string
}

export const sendSpecialRequestForm = (data: specialRequestProps) => {
  return api.post('/forms/specialRequest', data)
}

interface corporateFormProps {
  name: string
  email: string
  details: string
  interest: string
}

export const sendCorporateForm = (data: corporateFormProps) => {
  return api.post('/forms/corporate', data)
}

export interface ambassadorFormProps {
  title: string
  email: string
  name: string
  age: number
  employer: string
  industry: string
  instagram: string
  facebook: string
  linkedin: string
}

export const sendAmbassadorForm = (data: ambassadorFormProps) => {
  return api.post('/forms/ambassadors', data)
}

export interface serviceFormProps {
  interest: string[]
  name: string
  email: string
  details: string
}

export const sendServicesForm = (data: serviceFormProps) => {
  return api.post('/forms/services', data)
}

interface contactFormProps {
  name: string
  email: string
  details: string
}

export const sendContactForm = (data: contactFormProps) => {
  return api.post('/forms/contact', data)
}

export interface newsletterFormProps {
  email: string
  age: number
  workDepartment: string
}

export const sendNewsletterForm = (data: newsletterFormProps) => {
  return api.post('/forms/newsletter', data)
}

//eslint-disable-next-line
export const handleFormError = (err: any) => {
  if (err.response == null) {
    toast.error('Failed to comunicate with the server')
  }
  toast.error(err.response.data)
}
