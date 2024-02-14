import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import React, { ChangeEventHandler, useEffect, useState } from 'react'
import { ClubProps } from 'types/club'
import './reservationForm.Module.scss'
import { formatDateToYYYYMMDD } from 'func/formatDateToYYYYMMDD'
import { RestaurantProps } from 'types/restaurant'
import PeopleSelector from 'components/peopleSelector/peopleSelector'
import {
  reservationFormProps,
  sendReservationForm,
} from 'services/formsService'
import { toast } from 'react-toastify'

export default function ReservationForm({
  club,
}: {
  club: ClubProps | RestaurantProps
}) {
  const [male, setMale] = useState(2)
  const [female, setFemale] = useState(2)

  const [formData, setFormData] = useState({
    male: 2,
    female: 2,
    spendingAmount: club.minimumSpending != null ? 1000 : null,
    date: formatDateToYYYYMMDD(new Date()),
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    setFormData((old) => {
      return { ...old, female: female, male: male }
    })
  }, [male, female])

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onClick = async () => {
    console.log(formData)
    const body = { ...formData, date: new Date(formData.date), location: club }

    try {
      const response = await sendReservationForm(body as reservationFormProps)
      console.log(response.data)

      toast.success(response.data)

      //eslint-disable-next-line
    } catch (err: any) {
      toast.error('Some error occured')
    }
  }

  return (
    <div className="reservation__form">
      <PeopleSelector
        female={female}
        male={male}
        setFemale={setFemale}
        setMale={setMale}
      />
      {formData.spendingAmount != null && (
        <FormInput
          name="spendingAmount"
          title={'£' + club?.minimumSpending + ' Minimum Spent'}
          type="number"
          value={formData.spendingAmount}
          onChange={onChange}
          placeholder={club?.minimumSpending + '' || '1000'}
        />
      )}
      <FormInput
        name="date"
        onChange={onChange}
        value={formData.date}
        title="Date"
        type="date"
      />
      <FormInput
        name="name"
        onChange={onChange}
        value={formData.name}
        title="Name"
        placeholder="Name"
      />
      <FormInput
        name="email"
        onChange={onChange}
        title="Email"
        value={formData.email}
        placeholder="Email"
      />
      <FormInput
        name="phone"
        onChange={onChange}
        value={formData.phone}
        title="Phone"
        placeholder="Phone"
      />
      <div className="form__button">
        <Button onClick={onClick}>Reserve Table</Button>
      </div>
    </div>
  )
}
