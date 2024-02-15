import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './newsletterForm.Module.scss'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import { toast } from 'react-toastify'

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    age: undefined,
    workDepartment: '',
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      toast.success('Signed to newsletter')
    }, 250)
    setFormData({ email: '', age: undefined, workDepartment: '' })
  }

  return (
    <div className="newsletterForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle
        title="Join our Newsletter"
        subtitle="Subscribe to our newsletter to stay up to date with the latest news and events in London"
      />
      <div className="newsletterForm__container">
        <form className="form" onSubmit={onSubmit}>
          <div className="form__body">
            <FormInput
              title="Email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
              name="email"
              required
            />
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
          </div>
          <div className="form__button">
            <Button>Register</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
