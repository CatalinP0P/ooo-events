import Popup from 'components/layout/popup/popup'
import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { RestaurantProps } from 'types/restaurant'
import { CloseRounded } from '@mui/icons-material'
import FormSelect from 'components/forms/formSelect/formSelect'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import './specialRequestPopup.Module.scss'
import Button from 'components/ui/button/button'
import { sendSpecialRequestForm } from 'services/formsService'
import { toast } from 'react-toastify'

interface specialRequestProps {
  visibile: boolean
  setVisible: Dispatch<SetStateAction<boolean>>
  restaurant: RestaurantProps
}

export default function SpecialRequestPopup({
  restaurant,
  visibile,
  setVisible,
}: specialRequestProps) {
  console.log(restaurant)
  const interestOptions = ['Guest List', 'Other...']

  const [interest, setInterest] = useState(interestOptions[0])

  const [formData, setFormData] = useState({
    interest: interestOptions[0],
    name: '',
    email: '',
    details: '',
    restaurant: restaurant,
  })

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

    sendSpecialRequestForm(formData)
      .then((response) => {
        toast.success(response.data)
      })
      .catch(() => {
        toast.error('Some error occured.')
      })

    setFormData({
      interest: interestOptions[0],
      name: '',
      email: '',
      details: '',
      restaurant: restaurant,
    })
  }

  return (
    <Popup visibility={visibile} setVisibility={setVisible}>
      <div className="specialRequest">
        <div className="specialRequest__header">
          <label className="header__title">Guest List</label>
          <div className="header__close" onClick={() => setVisible(false)}>
            <CloseRounded fontSize="inherit" />
          </div>
        </div>

        <form className="specialRequest__form" onSubmit={onSubmit}>
          <FormSelect
            value={interest}
            setValue={setInterest}
            options={interestOptions}
          ></FormSelect>
          <div className="form__row">
            <FormInput
              title="Name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={onChange}
            />
            <FormInput
              title="Email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
            />
          </div>

          <FormTextArea
            title="Details"
            name="details"
            placeholder="Details"
            value={formData.details}
            onChange={onChange}
          />
          <div className="form__button">
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </Popup>
  )
}
