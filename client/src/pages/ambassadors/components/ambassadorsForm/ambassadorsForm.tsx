import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './ambassadorsForm.Module.scss'
import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import { ambassadorFormProps, sendAmbassadorForm } from 'services/formsService'
import { toast } from 'react-toastify'

export default function AmbassadorsForm() {
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

    sendAmbassadorForm(data)
      .then((response) => {
        toast.success(response.data)
      })
      .catch(() => {
        toast.error('Some error occured.')
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
      <SectionTitle
        title="Become one of the Out Of Office Ambassadors"
        subtitle="Have a big network within IT, Sales, Media, Finance, Bio Tech, Insurance, or similar industries? Would you like VIP Access to our events? Look this way!"
      />

      <div className="ambassadorsForm__container">
        <form className="form" onSubmit={onSubmit}>
          <FormInput
            title="Name"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={onChange}
          />
          <FormInput
            title="Email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChange}
          />
          <div className="form__row">
            <FormInput
              title="Your Title"
              placeholder="Your Title"
              name="title"
              value={data.title}
              onChange={onChange}
            />
            <FormInput
              title="Age ( Must be 23+ to Join )"
              placeholder="Age"
              name="age"
              value={data.age}
              onChange={onChange}
            />
          </div>
          <div className="form__row">
            <FormInput
              title="Your Employer"
              placeholder="Your Employer"
              name="employer"
              value={data.employer}
              onChange={onChange}
            />
            <FormInput
              title="Your Industry"
              placeholder="Your Industry"
              name="industry"
              value={data.industry}
              onChange={onChange}
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
