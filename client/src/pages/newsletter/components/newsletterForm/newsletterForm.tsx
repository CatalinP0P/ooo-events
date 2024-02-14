import FormInput from 'components/forms/formInput/formInput'
import Button from 'components/ui/button/button'
import SectionTitle from 'components/ui/sectionTitle/sectionTitle'
import React, { useState } from 'react'
import './newsletterForm.Module.scss'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')

  const onSubmit = () => {
    setEmail('')
  }

  return (
    <div className="newsletterForm">
      <SectionTitle
        title="Join our Newsletter"
        subtitle="Subscribe to our newsletter to stay up to date with the latest news and events in London"
      />
      <div className="newsletterForm__container">
        <div className="form">
          <div className="form__body">
            <FormInput
              title="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button onClick={onSubmit}>Register</Button>
        </div>
      </div>
    </div>
  )
}
