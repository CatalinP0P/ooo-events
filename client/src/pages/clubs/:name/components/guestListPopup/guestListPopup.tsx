import FormInput from 'components/forms/formInput/formInput'
import Popup from 'components/layout/popup/popup'
import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { ClubProps } from 'types/club'
import './guestListPopup.Module.scss'
import PeopleSelector from 'components/peopleSelector/peopleSelector'
import { CloseRounded } from '@mui/icons-material'
import Button from 'components/ui/button/button'
import {
  guestFormProps,
  handleFormError,
  sendGuestListForm,
} from 'services/formsService'
import { formatDateToYYYYMMDD } from 'func/formatDateToYYYYMMDD'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import FormTermsAndCo from 'components/forms/formTermsAndCo/formTermsAndCo'

interface guestListProps {
  visibility: boolean
  setVisibility: Dispatch<SetStateAction<boolean>>
  club: ClubProps
}

export default function GuestListPopup({
  visibility,
  setVisibility,
  club,
}: guestListProps) {
  const [loading, setLoading] = useState(false)
  const [male, setMale] = useState(2)
  const [female, setFemale] = useState(2)

  const [formData, setFormData] = useState<guestFormProps>({
    name: '',
    male,
    female,
    date: formatDateToYYYYMMDD(new Date()),
    email: '',
    phone: '',
    club: club,
    age: undefined,
    workDepartment: '',
  })

  useEffect(() => {
    setFormData((old) => {
      return { ...old, male, female }
    })
  }, [male, female])

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    const { name, value } = e.target

    setFormData((old) => {
      return { ...old, [name]: value }
    })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)

    sendGuestListForm(formData)
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })
  }

  return (
    <Popup visibility={visibility} setVisibility={setVisibility}>
      <LoadingOverlay visible={loading} />
      <div className="guestListPopup">
        <div className="guestList__header">
          <label className="header__title">Guest List</label>
          <div className="header__close" onClick={() => setVisibility(false)}>
            <CloseRounded fontSize="inherit" />
          </div>
        </div>
        <form className="guestListPopup__form" onSubmit={onSubmit}>
          <PeopleSelector
            male={male}
            female={female}
            setMale={setMale}
            setFemale={setFemale}
          />
          <FormInput
            type="date"
            title="Date"
            name="date"
            value={formData.date}
            onChange={onChange}
            required
          />
          <FormInput
            title="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
          <FormInput
            title="Email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
          <FormInput
            name="age"
            title="Age"
            placeholder="Age"
            value={formData.age}
            onChange={onChange}
            type="number"
          />
          <FormInput
            name="workDepartment"
            title="Work Department"
            placeholder="Work Department"
            value={formData.workDepartment}
            onChange={onChange}
            required
          />
          <FormInput
            title="Phone"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
          />

          <FormTermsAndCo />

          <p className="form__text">
            Guestlist does not guarantee entry. Make sure you read the T&Cs and
            follow the guidelines
          </p>

          <div className="form__button">
            <Button>Reserve</Button>
          </div>
        </form>
      </div>
    </Popup>
  )
}
