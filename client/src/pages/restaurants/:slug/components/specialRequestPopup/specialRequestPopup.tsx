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
import { handleFormError, sendSpecialRequestForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import FormTermsAndCo from 'components/forms/formTermsAndCo/formTermsAndCo'

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
  const [loading, setLoading] = useState(false)
  const interestOptions = ['Guest List', 'Other...']

  const [interest, setInterest] = useState(interestOptions[0])

  const [formData, setFormData] = useState({
    interest: interestOptions[0],
    name: '',
    email: '',
    details: '',
    restaurant: restaurant,
    age: undefined,
    workDepartment: '',
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
    setLoading(true)
    e.preventDefault()

    sendSpecialRequestForm(formData)
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })

    setFormData({
      interest: interestOptions[0],
      name: '',
      email: '',
      details: '',
      restaurant: restaurant,
      age: undefined,
      workDepartment: '',
    })
  }

  return (
    <Popup visibility={visibile} setVisibility={setVisible}>
      <LoadingOverlay visible={loading} />
      <div className="specialRequest">
        <div className="specialRequest__header">
          <label className="header__title">Special Request</label>
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
              required
            />
            <FormInput
              title="Email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
              required
            />
          </div>

          <FormInput
            name="age"
            title="Age"
            placeholder="Age"
            value={formData.age}
            onChange={onChange}
            required
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

          <FormTextArea
            title="Details"
            name="details"
            placeholder="Details"
            value={formData.details}
            onChange={onChange}
            required
          />
          <FormTermsAndCo />
          <div className="form__button">
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </Popup>
  )
}
