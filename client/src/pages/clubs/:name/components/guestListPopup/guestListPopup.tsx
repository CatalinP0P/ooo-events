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
import { Close, CloseRounded } from '@mui/icons-material'
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
import { EventProps } from 'types/event'

interface guestListProps {
  visibility: boolean
  setVisibility: Dispatch<SetStateAction<boolean>>
  club: ClubProps | EventProps
}

export interface peopleProps {
  name: string
  age: number
  id: number
}

export default function GuestListPopup({
  visibility,
  setVisibility,
  club,
}: guestListProps) {
  const [loading, setLoading] = useState(false)

  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState(18)

  const [people, setPeople] = useState<peopleProps[]>([])

  const [formData, setFormData] = useState<guestFormProps>({
    name: '',
    people: people,
    date: formatDateToYYYYMMDD(new Date()),
    email: '',
    phone: '',
    club: club,
    age: undefined,
    workDepartment: '',
  })

  useEffect(() => {
    setFormData({ ...formData, people })
  }, [people])

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

    console.log(formData)
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

          <div className="people__list">
            <label className="people__title">Add Friends</label>
            {people.map((person) => {
              return (
                <div className="list__person" key={Math.random() * 1000}>
                  <label className="person__label">
                    {person.name} - {person.age}
                  </label>
                  <div
                    className="person__delete"
                    onClick={() =>
                      setPeople(people.filter((m) => m.id != person.id))
                    }
                  >
                    <Close />
                  </div>
                </div>
              )
            })}
            <div className="new__person">
              <div className="new__person__form">
                <FormInput
                  title="Name"
                  placeholder="Name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <FormInput
                  title="Age"
                  type="number"
                  placeholder="Age"
                  value={newAge}
                  onChange={(e) => setNewAge(parseInt(e.target.value))}
                />
              </div>
              <button
                className="new__person__button"
                onClick={() => {
                  if (newAge < 18) return toast.error('Must be over 18!')
                  if (newName.trim() == '') return

                  setPeople([
                    ...people,
                    { name: newName, age: newAge, id: Math.random() * 1000 },
                  ])
                  setNewName('')
                  setNewAge(18)
                }}
                type="button"
              >
                Add Friend
              </button>
            </div>
          </div>

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
