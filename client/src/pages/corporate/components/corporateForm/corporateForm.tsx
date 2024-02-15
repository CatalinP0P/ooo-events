import React, { FormEventHandler, useState } from 'react'
import './corporateForm.Module.scss'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import Button from 'components/ui/button/button'
import FormSelect from 'components/forms/formSelect/formSelect'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import { handleFormError, sendCorporateForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'

export default function CorporateForm() {
  const [loading, setLoading] = useState(false)

  const options = [
    'Guest List',
    'Table Service',
    'Vip Table Service',
    'Full Vip Area Booking',
    'Members Room',
    'Full Venue Floor Take-Over',
    'Full Venue Take-Over',
    'Other...',
  ]

  const [option, setOption] = useState(options[0])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setLoading(true)
    sendCorporateForm({ interest: option, email, name, details })
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })

    setOption(options[0])
    setEmail('')
    setName('')
    setDetails('')
  }

  return (
    <div className="corporateForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle title="Get in Touch" />
      <div className="corporateForm__container">
        <div className="container__item">
          <label className="item__title">What we can offer?</label>
          <div className="whatweoffer">
            <div className="whatweoffer__body">
              {options.map((option) => {
                return (
                  <label key={option} className="body__item">
                    • {option}
                  </label>
                )
              })}
            </div>
          </div>
        </div>

        <div className="container__item">
          <label className="item__title">Request Form</label>
          <form className="corporateForm" onSubmit={onSubmit}>
            <div className="corporateForm__body">
              <FormSelect
                title="Interest"
                options={options}
                value={option}
                setValue={setOption}
              />
              <div className="form__row">
                <FormInput
                  title="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <FormInput
                  title="Name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <FormTextArea
                title="Details"
                placeholder="Details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>
            <div>
              <Button>Send</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
