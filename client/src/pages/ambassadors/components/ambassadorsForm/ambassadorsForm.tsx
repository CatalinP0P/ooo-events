import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './ambassadorsForm.Module.scss'
import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import {
  ambassadorFormProps,
  handleFormError,
  sendAmbassadorForm,
} from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'

export default function AmbassadorsForm() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ambassadorFormProps>({
    title: '',
    email: '',
    name: '',
    age: 23,
    employer: '',
    industry: '',
    instagram: '',
    facebook: '',
    linkedin: '',
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setData({ ...data, [name]: value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)

    sendAmbassadorForm(data)
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })

    setData({
      title: '',
      email: '',
      name: '',
      age: 23,
      employer: '',
      industry: '',
      instagram: '',
      facebook: '',
      linkedin: '',
    })
  }

  return (
    <div className="ambassadorsForm">
      <LoadingOverlay visible={loading} />
      <div className="ambassadorsForm__container">
        <form className="form" onSubmit={onSubmit}>
          <FormInput
            title="Name"
            placeholder="Name"
            name="name"
            value={data.name}
            required
            onChange={onChange}
          />
          <FormInput
            title="Email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChange}
            required
          />
          <div className="form__row">
            <FormInput
              title="Your Title"
              placeholder="Your Title"
              name="title"
              value={data.title}
              onChange={onChange}
              required
            />
            <FormInput
              title="Age ( Min 23 )"
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={onChange}
              required
            />
          </div>
          <div className="form__row">
            <FormInput
              title="Your Employer"
              placeholder="Your Employer"
              name="employer"
              value={data.employer}
              onChange={onChange}
              required
            />
            <FormInput
              title="Your Industry"
              placeholder="Your Industry"
              name="industry"
              value={data.industry}
              onChange={onChange}
              required
            />
          </div>
          <FormInput
            title="Instagram"
            placeholder="Instagram"
            name="instagram"
            value={data.instagram}
            onChange={onChange}
          />
          <FormInput
            title="Facebook"
            placeholder="Facebook"
            name="facebook"
            value={data.facebook}
            onChange={onChange}
          />
          <FormInput
            title="Linkedin"
            placeholder="Linkedin"
            name="linkedin"
            value={data.linkedin}
            onChange={onChange}
          />
          <div className="form__button">
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
