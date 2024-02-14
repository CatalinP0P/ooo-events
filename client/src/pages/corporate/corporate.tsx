import PageTitle from 'components/ui/pageTitle/pageTitle'
import React from 'react'
import CorporateForm from './components/corporateForm/corporateForm'
import AboutSection from './components/aboutSection/aboutSection'

export default function Corporate() {
  return (
    <>
      <PageTitle>Corporate</PageTitle>
      <AboutSection />
      <CorporateForm />
    </>
  )
}
