import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { ChangeEventHandler, useState } from 'react'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import Button from 'components/ui/button/button'
import './contactForm.Module.scss'
import { Mail, WhatsApp } from '@mui/icons-material'
import { sendContactForm } from 'services/formsService'
import { toast } from 'react-toastify'

export default function ContactForm() {
  interface formDataProps {
    name: string
    email: string
    details: string
  }

  const phone = '(1234) 567 890'
  const mail = 'contact@oooevents.com'

  const [formData, setFormData] = useState<formDataProps>({
    name: '',
    email: '',
    details: '',
  })

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e,
  ) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = () => {
    sendContactForm(formData)
      .then((response) => {
        toast.success(response.data)
      })
      .catch(() => {
        toast.error('Some error occured.')
      })
    setFormData({ name: '', email: '', details: '' })
  }

  return (
    <div className="contactForm">
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
        <div className="form">
          <div className="form__body">
            <div className="container__row">
              <FormInput
                name="name"
                title="Name"
                placeholder="Name"
                value={formData.name}
                onChange={onChange}
              />

              <FormInput
                name="email"
                title="Email"
                placeholder="Email"
                value={formData.email}
                onChange={onChange}
              />
            </div>
            <FormTextArea
              name="details"
              title="Details"
              placeholder="Details"
              value={formData.details}
              onChange={onChange}
            />
          </div>
          <div>
            <Button onClick={onSubmit}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
