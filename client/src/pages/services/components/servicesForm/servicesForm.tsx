import Button from 'components/ui/button/button'
import React, { ChangeEventHandler, FormEventHandler, useState } from 'react'
import './servicesForm.Module.scss'
import FormInput from 'components/forms/formInput/formInput'
import FormTextArea from 'components/forms/formTextArea/formTextArea'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import { handleFormError, sendServicesForm } from 'services/formsService'
import { toast } from 'react-toastify'
import LoadingOverlay from 'components/ui/loadingOverlay/loadingOverlay'

export default function ServicesForm() {
  const [loading, setLoading] = useState(false)
  const [interest, setInterest] = useState<string[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [details, setDetails] = useState('')

  const categories = [
    {
      title: 'Music',
      services: [
        'DJ',
        'Headling Artist',
        'Bands',
        'Sax',
        'Percussion',
        'Guitar',
        'Violin',
        'Trumpet / Thrombone',
        'Keys & Vocals',
        'Singer',
        'Beatbox',
      ],
    },
    {
      title: 'Performers',
      services: [
        'Acrobats',
        'Fire',
        'Dance',
        'Contortion',
        'Models',
        'Stunt Performers',
        'Pole',
        'Photographers',
        'Videographer',
      ],
    },
    {
      title: 'Bespoke Events',
      services: [
        'Brand Activations',
        'Product Launches',
        'In-Store Events',
        'In-Store Music',
        'Company Parties',
        'Award Ceremonies',
        'Team Building',
        'Office Parties',
      ],
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
        subtitle="Make your party stand out with us"
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
          </div>
          <div>
            <Button>Send</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
