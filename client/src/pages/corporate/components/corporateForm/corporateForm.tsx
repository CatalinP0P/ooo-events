import React, { FormEventHandler, useEffect, useState } from 'react'
import './corporateForm.Module.scss'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import Button from 'components/ui/button/button'
import FormSelect from 'components/forms/formSelect/formSelect'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import { handleFormError, sendCorporateForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import FormTermsAndCo from 'components/forms/formTermsAndCo/formTermsAndCo'
import useCorporatePage from 'hooks/useCorporatePage'

export default function CorporateForm() {
  const pageData = useCorporatePage()

  const [loading, setLoading] = useState(false)

  const [option, setOption] = useState(
    pageData.data?.whatWeOffer ? pageData.data?.whatWeOffer[0] : '',
  )

  useEffect(() => {
    if (loading) return

    setOption(pageData.data?.whatWeOffer[0] as string)
  }, [pageData.loading])

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

    setOption(pageData.data?.whatWeOffer ? pageData.data?.whatWeOffer[0] : '')
    setEmail('')
    setName('')
    setDetails('')
  }

  if (pageData.loading) return <></>

  return (
    <div className="corporateForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle title="Get in Touch" />
      <div className="corporateForm__container">
        <div className="container__item">
          <label className="item__title">What we can offer?</label>
          <div className="whatweoffer">
            <div className="whatweoffer__body">
              {pageData.data?.whatWeOffer?.map((option) => {
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
                options={pageData.data?.whatWeOffer}
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
              <FormTermsAndCo />
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
