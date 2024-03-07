import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './newsletterForm.Module.scss'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import { toast } from 'react-toastify'
import { newsletterFormProps, sendNewsletterForm } from 'services/formsService'
import useNewsletterPage from 'hooks/useNewsletterPage'

export default function NewsletterForm() {
  const pageData = useNewsletterPage()
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

    sendNewsletterForm(formData as unknown as newsletterFormProps)
      .then((response) => {
        toast.success(response.data)
      })
      .catch((err) => {
        toast.error(err.response.data)
      })

    setFormData({ email: '', age: undefined, workDepartment: '' })
    setLoading(false)
  }

  return (
    <div className="newsletterForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle
        title="Join our Newsletter"
        subtitle={pageData?.data?.subtitle}
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
