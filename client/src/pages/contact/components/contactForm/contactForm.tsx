import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import Button from 'components/ui/button/button'
import './contactForm.Module.scss'
import { Mail, WhatsApp } from '@mui/icons-material'
import { handleFormError, sendContactForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  interface formDataProps {
    name: string
    email: string
    details: string
    age: number | undefined
    workDepartment: string
  }

  const phone = '(1234) 567 890'
  const mail = 'contact@oooevents.com'

  const defaultData = {
    name: '',
    email: '',
    details: '',
    age: undefined,
    workDepartment: '',
  }

  const [formData, setFormData] = useState<formDataProps>(defaultData)

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)

    sendContactForm(formData)
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })

    setFormData(defaultData)
  }

  return (
    <div className="contactForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle
        title="Get In Touch"
        subtitle="Contact us for any question"
      />
      <div className="contactForm__container">
        <div className="contactForm__info">
          <a className="info__item" href={'tel:+' + phone}>
            <div className="item__icon">
              <WhatsApp fontSize="inherit" />
            </div>
            <label className="item__text">{phone}</label>
          </a>

          <a className="info__item" href={'mailto:' + mail}>
            <div className="item__icon">
              <Mail fontSize="inherit" />
            </div>
            <label className="item__text">{mail}</label>
          </a>
        </div>
        <form className="form" onSubmit={onSubmit}>
          <div className="form__body">
            <div className="container__row">
              <FormInput
                name="name"
                title="Name"
                placeholder="Name"
                value={formData.name}
                onChange={onChange}
                required
              />

              <FormInput
                name="email"
                title="Email"
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
              name="details"
              title="Details"
              placeholder="Details"
              value={formData.details}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
