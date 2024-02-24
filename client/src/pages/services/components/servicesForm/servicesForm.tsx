import Button from 'components/ui/button/button'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './servicesForm.Module.scss'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import { handleFormError, sendServicesForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'
import FormTermsAndCo from 'components/forms/formTermsAndCo/formTermsAndCo'
import useServicesPage from 'hooks/usServicesPage'

export default function ServicesForm() {
  const [loading, setLoading] = useState(false)
  const [interest, setInterest] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')

  const pageData = useServicesPage()

  if (pageData.loading) return <></>

  const categories = [
    {
      title: 'Music',
      services: pageData.data?.musicServices as string[],
    },
    {
      title: 'Performers',
      services: pageData.data?.performersServices as string[],
    },
    {
      title: 'Bespoke Events',
      services: pageData.data?.eventsServices as string[],
    },
  ]

  const cbOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, checked } = e.target

    if (checked) {
      setInterest([...interest, name])
    } else {
      setInterest(interest.filter((m) => m != name))
    }
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    setLoading(true)
    sendServicesForm({ interest, name, email, details })
      .then((response) => {
        setLoading(false)
        toast.success(response.data)
      })
      .catch((err) => {
        setLoading(false)
        handleFormError(err)
      })

    setInterest([])
    setName('')
    setEmail('')
    setDetails('')
  }

  return (
    <div className="serviceForm">
      <LoadingOverlay visible={loading} />
      <SectionTitle
        title="Request Service"
        subtitle={pageData.data?.subtitle}
      />
      <div className="serviceForm__container">
        <div className="serviceForm__header">
          {categories.map((category) => {
            return (
              <div key={category.title} className="header__item">
                <h4 className="item__title">{category.title}</h4>
                <div className="item__services">
                  {category.services.map((service) => {
                    return (
                      <div className="services__item" key={service}>
                        <input
                          type="checkbox"
                          name={service}
                          onChange={cbOnChange}
                          checked={interest.includes(service)}
                        />
                        <label>{service}</label>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          <div className="header__item header__item--max">
            <div className="services__item">
              <input
                type="checkbox"
                onChange={cbOnChange}
                name="Other..."
                checked={interest.includes('Other...')}
              />
              <label>Other... (Please advice in Event Notes)</label>
            </div>
          </div>
        </div>

        <form className="serviceForm__body" onSubmit={onSubmit}>
          <div className="body__header">
            <FormInput
              name="name"
              placeholder="Name"
              title="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <FormInput
              name="email"
              placeholder="Email"
              title="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FormTextArea
              name="Detail"
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
  )
}
