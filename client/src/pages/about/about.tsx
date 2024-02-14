import React from 'react'
import AboutSection from './components/aboutSection/aboutSection'
import DetailsSection from './components/detailsSection/detailsSection'
import PageTitle from 'components/ui/pageTitle/pageTitle'

export default function About() {
  return (
    <>
      <PageTitle>About us</PageTitle>
      <AboutSection />
      <DetailsSection />
    </>
  )
}
