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
import { guestFormProps, sendGuestListForm } from 'services/formsService'
import { formatDateToYYYYMMDD } from 'func/formatDateToYYYYMMDD'
import { toast } from 'react-toastify'

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
  console.log(club)
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

    sendGuestListForm(formData)
      .then((response) => {
        toast.success(response.data)
      })
      .catch(() => {
        toast.error('Some error occured.')
      })
  }

  return (
    <Popup visibility={visibility} setVisibility={setVisibility}>
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
          />
          <FormInput
            title="Name"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
          <FormInput
            title="Email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <FormInput
            title="Phone"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={onChange}
          />

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
