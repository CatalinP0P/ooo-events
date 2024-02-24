import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import React, {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { ClubProps } from 'types/club'
import './reservationForm.Module.scss'
import { formatDateToYYYYMMDD } from 'func/formatDateToYYYYMMDD'
import { RestaurantProps } from 'types/restaurant'
import PeopleSelector from 'components/peopleSelector/peopleSelector'
import {
  handleFormError,
  reservationFormProps,
  sendReservationForm,
} from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import FormTermsAndCo from 'components/forms/formTermsAndCo/formTermsAndCo'

export default function ReservationForm({
  club,
}: {
  club: ClubProps | RestaurantProps
}) {
  const [loading, setLoading] = useState(false)
  const [male, setMale] = useState(2)
  const [female, setFemale] = useState(2)

  const defaultData = {
    male: 2,
    female: 2,
    spendingAmount: club.minimumSpending != null ? 1000 : null,
    date: formatDateToYYYYMMDD(new Date()),
    name: '',
    age: undefined,
    workDepartment: '',
    email: '',
    phone: '',
  }

  const [formData, setFormData] = useState(defaultData)

  useEffect(() => {
    setFormData((old) => {
      return { ...old, female: female, male: male }
    })
  }, [male, female])

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log(formData)
    const body = { ...formData, date: new Date(formData.date), location: club }

    try {
      const response = await sendReservationForm(body as reservationFormProps)
      setLoading(false)
      toast.success(response.data)
    } catch (err) {
      setLoading(false)
      handleFormError(err)
    }

    setFormData(defaultData)
  }

  return (
    <form className="reservation__form" onSubmit={onSubmit}>
      <LoadingOverlay visible={loading} />
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
          required
        />
      )}
      <FormInput
        name="date"
        onChange={onChange}
        value={formData.date}
        title="Date"
        type="date"
        required
      />
      <FormInput
        name="name"
        onChange={onChange}
        value={formData.name}
        title="Name"
        placeholder="Name"
        required
      />
      <FormInput
        name="age"
        onChange={onChange}
        placeholder="Age"
        type="number"
        title="Age"
        value={formData.age}
        required
      />
      <FormInput
        name="workDepartment"
        onChange={onChange}
        placeholder="Work Department"
        title="Work Department"
        value={formData.workDepartment}
        required
      />
      <FormInput
        name="email"
        onChange={onChange}
        title="Email"
        value={formData.email}
        placeholder="Email"
        required
      />
      <FormInput
        name="phone"
        onChange={onChange}
        value={formData.phone}
        title="Phone"
        placeholder="Phone"
        required
      />
      <FormTermsAndCo />
      <div className="form__button">
        <Button>Reserve Table</Button>
      </div>
    </form>
  )
}
